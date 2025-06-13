import PDFDocument from "pdfkit";

export async function POST(req: Request) {
  const { name } = await req.json();

  const doc = new PDFDocument();
  const chunks: any[] = [];

  doc.fontSize(25).text(`Certificate of Completion`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Awarded to: ${name}`, { align: 'center' });

  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {
    const result = Buffer.concat(chunks);
    return new Response(result, {
      headers: { 'Content-Type': 'application/pdf' }
    });
  });

  doc.end();
}
