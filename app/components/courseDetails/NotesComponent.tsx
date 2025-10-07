import { useState, useEffect, type FormEvent } from "react";
import dayjs from "dayjs";
import {
  uploadNote,
  fetchNotes,
  deleteNote,
  getNoteUrl,
} from "~/utils/noteStorage";
import { fetchAuthSession } from "aws-amplify/auth";
import { Button } from "~/components/ui/button";
import AppDialog from "~/components/AppDialog";
import { BookOpen, Sparkles, Trash2 } from "lucide-react";
import FileUploader from "../FileUploader";
import { S3Client } from "@aws-sdk/client-s3";
import { getS3Client } from "~/utils/s3Client";
import callAnalyze from "~/utils/notesAnalyze";
import Loader from "../Loader";
import Error, { type ErrorProps } from "../Error";
import { useParams } from "react-router";
import { StudyResultModal } from "./StudyResultModal";
import formatSize from "~/utils/formatSize";

interface Note {
  id: string;
  title: string;
  lastModified?: number;
  size?: number;
}
const Notes = () => {
  const { semesterId, courseId } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [s3Client, setS3Client] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [statusText, setStatusText] = useState("");
  const [open, setOpen] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [summary, setSummary] = useState("");
  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setStatusText("Loading notes...");
      setError("");
      const { tokens } = await fetchAuthSession();
      const sub = tokens?.idToken?.payload?.sub ?? null;

      setUserId(sub);

      if (!sub || !courseId || !semesterId) return;

      const s3Client = await getS3Client();
      console.log("s3client", s3Client);
      const existing = await fetchNotes(
        s3Client,
        `${sub}/${semesterId}/${courseId}`
      );
      console.log("existing", existing);
      if (!existing) return;
      setNotes(existing);

      // Store the client for uploads/deletes
      setS3Client(s3Client);
    } catch (err) {
      console.error("Error loading file", err);
      setError("Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  };
  const [_, setRetryFunction] = useState<ErrorProps["retry"]>(async () => {});

  useEffect(() => {
    loadNotes();
  }, []);

  const handleFileSelect = (file: File | null) => setFile(file);
  const respo = {
    body: '{"id":"msg_bdrk_017fTQXoLBy98PQMLZGtKSHh","type":"message","role":"assistant","model":"claude-3-5-sonnet-20241022","content":[{"type":"text","text":"{\\n  \\"summary\\": \\"This document covers semiconductor physics concepts, focusing on intrinsic and extrinsic semiconductors, carrier concentrations, and current mechanisms. It explains how doping affects semiconductor properties by introducing donor or acceptor atoms, and discusses drift and diffusion currents. The document includes MATLAB simulations demonstrating the relationships between carrier concentration, mobility, and drift current with respect to doping levels.\\",\\n  \\"flashcards\\": [\\n    {\\n      \\"question\\": \\"What is the key difference between intrinsic and extrinsic semiconductors?\\",\\n      \\"answer\\": \\"Intrinsic semiconductors are pure with no added impurities, while extrinsic semiconductors are deliberately doped with impurities to improve electrical conductivity\\"\\n    },\\n    {\\n      \\"question\\": \\"What is the relationship between electrons and holes in intrinsic semiconductors?\\",\\n      \\"answer\\": \\"In intrinsic semiconductors, the number of electrons (n) equals the number of holes (p), expressed as n=p=ni\\"\\n    },\\n    {\\n      \\"question\\": \\"What are the two types of extrinsic semiconductors?\\",\\n      \\"answer\\": \\"n-type (doped with donor atoms like phosphorus to increase electrons) and p-type (doped with acceptor atoms like boron to increase holes)\\"\\n    },\\n    {\\n      \\"question\\": \\"What is drift current?\\",\\n      \\"answer\\": \\"Drift current is the movement of charge carriers due to an electric field, where electrons move towards the positive region and holes towards the negative region\\"\\n    },\\n    {\\n      \\"question\\": \\"What is diffusion current?\\",\\n      \\"answer\\": \\"Diffusion current is the movement of charge carriers from a region of higher concentration to a region of lower concentration, occurring without an electric field\\"\\n    },\\n    {\\n      \\"question\\": \\"What is the Hall Effect?\\",\\n      \\"answer\\": \\"The Hall Effect is the development of a transverse voltage across a conductor when a magnetic field is applied perpendicular to the current, used to determine carrier type and concentration\\"\\n    }\\n  ]\\n}"}],"stop_reason":"end_turn","stop_sequence":null,"usage":{"input_tokens":2045,"output_tokens":472}}',
  };
  //   const parsedres = JSON.parse(respo.body);
  //   const parsedcontent = JSON.parse(parsedres.content[0].text);
  //   console.log("parsedcontent",parsedcontent);
  // const {flashcards,summary}=parsedcontent;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      setStatusText("Uploading note...");
      e.preventDefault();
      if (!file || !userId || !s3Client || !semesterId || !courseId) return;
      const note = await uploadNote(
        s3Client,
        file,
        userId,
        semesterId,
        courseId
      );
      setNotes((prev) => [...prev, note]);

      setFile(null);
    } catch (err) {
      console.error("Error uploading file", err);
      setError("Failed to upload note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setStatusText("Deleting note...");
    if (!s3Client) return;
    await deleteNote(s3Client, id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setIsLoading(false);
  };

  const handleAIAction = async (noteId: string) => {
    if (!s3Client) return;
    try {
      setIsLoading(true);
      setStatusText("Analyzing with AI...");
      console.log(noteId, "noteID");
      const res = await callAnalyze(noteId);
      const parsedBody = JSON.parse(res.body);
      const parsedContent = JSON.parse(parsedBody.content[0].text);
      setFlashcards(parsedContent.flashcards);
      setSummary(parsedContent.summary);
      setOpen(true);
    } catch (err) {
      setError("Network Error");
      setRetryFunction(() => (noteId: string) => handleAIAction(noteId));
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <Error error={error} retry={loadNotes} />;
  return (
    <div className="md:p-6 space-y-6">
      {isLoading && <Loader statusText={statusText} />}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <AppDialog
          triggerLabel="Upload Notes"
          title="Upload a Note"
          description="Choose a pdf file to upload."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FileUploader onFileSelect={handleFileSelect} />
            <Button
              type="submit"
              disabled={!s3Client}
              className="primary-button text-white ml-auto w-fit"
            >
              Upload
            </Button>
          </form>
        </AppDialog>
      </div>

      <StudyResultModal
        open={open}
        onClose={() => setOpen(false)}
        flashcards={flashcards}
        summary={summary}
        file={file}
      />
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes uploaded yet.</p>
      ) : (
        <section className="flex flex-col gap-4">
          {notes.map((note, i) => (
            <div
              key={note.id}
              className="flex items-center justify-between border border-gray-500 p-3 rounded-md backdrop-blur bg-white/20 dark:bg-gray-900/30"
            >
              <div>
                <p className="text-clamp-single">{note.title}</p>
                <div className="text-xs text-gray-500 flex gap-4">
                  <p className="">#{i + 1}</p>

                  <p className="!text-gray-800 dark:!text-gray-300">
                    {dayjs(note.lastModified).format("D MMM YY")}
                    &nbsp;&middot;&nbsp;
                    {dayjs(note.lastModified).format("h mm A")}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-xs text-gray-500">
                  {formatSize(note?.size ?? 0)}
                </p>
                <button
                  onClick={() => handleAIAction(note.id)}
                  title="View summaries and flashcards"
                  className="hover:text-blue-500 transition"
                >
                  <BookOpen size={18} />
                </button>

                <button
                  onClick={() => handleDelete(note.id)}
                  title="Delete Note"
                  className="hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Notes;
