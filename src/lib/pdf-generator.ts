import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import { OrderDetailDTO } from "@/types/responses/order";
import { formatPriceCLP } from "@/lib/currency";

export async function generateInvoicePDF(order: OrderDetailDTO) {
  // 1. Crear un nuevo documento
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]); // Tamaño personalizado

  // 2. Incrustar fuentes estándar
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { height } = page.getSize();
  let currentY = height - 50;

  // 3. Dibujar Encabezado
  page.drawText("Tienda UCN - Comprobante de Compra", {
    x: 50,
    y: currentY,
    size: 20,
    font: fontBold,
    color: rgb(0.1, 0.4, 0.8), // Azul Tienda UCN
  });

  currentY -= 40;

  // 4. Datos de la Orden
  const formattedDate = new Date(order.transactionDate).toLocaleString("es-CL");

  page.drawText(`Orden N°: ${order.code}`, { x: 50, y: currentY, size: 12, font: fontBold });
  currentY -= 20;
  page.drawText(`Fecha: ${formattedDate}`, { x: 50, y: currentY, size: 12, font: fontRegular });
  currentY -= 40;

  // 5. Encabezados de la Tabla de Productos
  page.drawText("Producto", { x: 50, y: currentY, size: 12, font: fontBold });
  page.drawText("Cant.", { x: 350, y: currentY, size: 12, font: fontBold });
  page.drawText("Subtotal", { x: 450, y: currentY, size: 12, font: fontBold });

  // Línea separadora
  currentY -= 10;
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: 550, y: currentY },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  currentY -= 20;

  // 6. Iterar sobre los productos
  order.items.forEach((item) => {
    // Truncar nombres muy largos
    const displayName =
      item.productName.length > 40 ? item.productName.substring(0, 37) + "..." : item.productName;

    page.drawText(displayName, { x: 50, y: currentY, size: 10, font: fontRegular });
    page.drawText(item.quantity.toString(), { x: 355, y: currentY, size: 10, font: fontRegular });
    page.drawText(formatPriceCLP(item.subtotalPrice), {
      x: 450,
      y: currentY,
      size: 10,
      font: fontRegular,
    });

    currentY -= 20;

    // Si la página se llena, habría que añadir otra lógica aquí, pero lo mantendremos simple para la ayudantía
  });

  // Línea separadora final
  currentY -= 10;
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: 550, y: currentY },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  currentY -= 30;

  // 7. Total
  page.drawText("TOTAL A PAGAR:", { x: 300, y: currentY, size: 14, font: fontBold });
  page.drawText(formatPriceCLP(order.totalPrice), {
    x: 450,
    y: currentY,
    size: 14,
    font: fontBold,
    color: rgb(0.1, 0.6, 0.3),
  });

  // 8. Serializar y descargar
  const pdfBytes = await pdfDoc.save();
  // aserción a 'any' o 'BlobPart' para evitar el falso positivo del linter
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // Crear un enlace temporal para forzar la descarga
  const a = document.createElement("a");
  a.href = url;
  a.download = `Boleta_${order.code}.pdf`;
  document.body.appendChild(a);
  a.click();

  // Limpieza
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
