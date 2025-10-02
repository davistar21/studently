import { useState } from "react";
import AppDialog from "~/components/AppDialog";
import { Button } from "~/components/ui/button";
import { FilePlus, Trash2, BookOpen, Sparkles } from "lucide-react"; // Lucide icons
import FileUploader from "../FileUploader";

interface Note {
  id: string;
  title: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]); // Replace with actual state from store if needed

  const handleUpload = () => {
    // Placeholder upload logic
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: `Note ${crypto.randomUUID()}`,
    };
    setNotes([...notes, newNote]);
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Notes
        </h2>
        <AppDialog
          triggerLabel="Upload Notes"
          title="Upload a Note"
          description="Choose a pdf file to upload."
        >
          {/* Upload form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpload();
            }}
            className="space-y-4"
          >
            <FileUploader />
            <Button
              type="submit"
              className="primary-button text-white ml-auto w-fit"
            >
              Upload
            </Button>
          </form>
        </AppDialog>
      </div>

      {/* No Notes */}
      {notes.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <AppDialog
            triggerLabel="Upload Notes"
            title="Upload a Note"
            description="Choose a note file to upload."
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpload();
              }}
              className="space-y-4"
            >
              <FileUploader />
              <Button
                type="submit"
                className="primary-button text-white ml-auto"
              >
                Upload
              </Button>
            </form>
          </AppDialog>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar">
          <section className="flex flex-col gap-4">
            {notes.map((note, index) => (
              <div
                key={note.id}
                className="border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-500 flex flex-row gap-2 px-3 py-5 items-center rounded-md"
              >
                <p className=" text-gray-800 dark:text-gray-300 text-xs mr-2">
                  {index + 1}
                </p>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-200 text-clamp-single md:text-lg">
                    {note.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Uploaded today . 2.5MB
                  </p>
                </div>
                <div className=" flex justify-center gap-4 text-gray-600 dark:text-gray-300">
                  <button
                    title="Summarize"
                    className="hover:text-blue-500 transition"
                  >
                    <BookOpen size={18} />
                  </button>
                  <button
                    title="Generate Flashcards"
                    className="hover:text-green-500 transition"
                  >
                    <Sparkles size={18} />
                  </button>
                  <button
                    title="Delete Note"
                    onClick={() => handleDelete(note.id)}
                    className="hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Notes;
