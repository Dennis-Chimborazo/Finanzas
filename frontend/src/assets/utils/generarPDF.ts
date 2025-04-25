import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Person, Account, Meta, Avance } from "./types";

// Utilidad interna para convertir una imagen pública a base64
async function getImageBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

type Props = {
  person: Person;
  account: Account;
  meta: Meta;
  avances: Avance[];
};

export async function generarPDF({ person, account, meta, avances }: Props) {
  const doc = new jsPDF();
  let totalPagado = 0;

  // Cargar logo desde public/logo.jpg
  let logoBase64: string | null = null;
  try {
    logoBase64 = await getImageBase64("/images/banner.png");
  } catch (error) {
    console.warn("Logo no se pudo cargar:", error);
  }

  const drawHeader = () => {
    doc.setFontSize(9);
    doc.setTextColor("#15803d");

    doc.text(`Nombre: ${person.nombre} ${person.apellido}`, 14, 15);
    doc.text(`Identificación: ${person.identificacion}`, 14, 21);
    doc.text(`Correo: ${person.correo}`, 14, 27);

    doc.text(`Cuenta: ${account.numero}`, 100, 15);
    doc.text(`Meta: ${meta.nombre} - $${meta.monto_objetivo.toFixed(2)}`, 100, 21);
    doc.text(`Fecha límite: ${meta.fecha_limite}`, 100, 27);

    if (logoBase64) {
      doc.addImage(logoBase64, "JPEG", 160, 10, 30, 20);
    }

    doc.setDrawColor("#15803d");
    doc.line(10, 35, 200, 35);
  };

  const tableBody = avances.map((avance) => {
    totalPagado += avance.monto;
    const falta = meta.monto_objetivo - totalPagado;
    return [
      avance.fecha,
      `$${avance.monto.toFixed(2)}`,
      avance.descripcion,
      avance.dentro_tiempo ? "Sí" : "No",
      `$${falta > 0 ? falta.toFixed(2) : "0.00"}`,
      `$${totalPagado.toFixed(2)}`
    ];
  });

  autoTable(doc, {
    startY: 40,
    head: [["Fecha", "Monto", "Descripción", "Dentro de tiempo", "Falta para la meta", "Total pagado"]],
    body: tableBody,
    theme: "grid",
    styles: { fontSize: 8 },
    margin: { top: 40 },
    didDrawPage: () => drawHeader()
  });

  doc.save(`reporte_${person.nombre}_${meta.nombre}.pdf`);
}
