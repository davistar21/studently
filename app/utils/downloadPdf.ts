import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Flashcard {
  question: string;
  answer: string;
}

interface SummaryData {
  title: string;
  summary: string;
  flashcards: Flashcard[];
}

export const downloadSummaryPdf = (data: SummaryData) => {
  const doc = new jsPDF();
  const marginLeft = 14;
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(data.title, pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Summary:", marginLeft, 35);
  const summaryText = doc.splitTextToSize(
    data.summary,
    pageWidth - marginLeft * 2
  );
  doc.text(summaryText, marginLeft, 45);

  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Flashcards", marginLeft, 20);

  const rows = data.flashcards.map((card, index) => [
    index + 1,
    card.question,
    card.answer,
  ]);

  autoTable(doc, {
    head: [["#", "Question", "Answer"]],
    body: rows,
    startY: 30,
    styles: {
      fontSize: 11,
      cellPadding: 3,
      valign: "middle",
      cellWidth: "auto",
    },
    headStyles: { fillColor: [66, 135, 245] },
  });

  doc.save(`${data.title.replace(/\s+/g, "_")}.pdf`);
};
