import { jsPDF } from 'jspdf';

// Embedded Snapsec logo base64 for instant, offline-capable PDF generation
const SNAPSEC_LOGO_BASE64 =
  'data:image/png;base64,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';

const fmt = (v) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);

/**
 * Generates and downloads a minimalist, enterprise-grade PDF quote.
 *
 * @param {Object} params
 * @param {Array} params.selectedList - List of selected module objects
 * @param {Object} params.assets - Map of module id to asset count
 * @param {number} params.total - Estimated annual total
 * @param {string} params.customerName - Name provided by the user
 * @param {string} params.customerEmail - Email provided by the user
 */
export const downloadQuotePdf = ({
  selectedList,
  assets,
  total,
  customerName = 'Valued Customer',
  customerEmail = 'customer@organization.com',
}) => {
  if (!selectedList || selectedList.length === 0) {
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2; // 170mm

  // 1. Header: Snapsec Logo
  doc.addImage(SNAPSEC_LOGO_BASE64, 'PNG', margin, 18, 42, 6.78);

  // 2. Header Info: Quote Meta
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(17, 24, 39);
  doc.text('PRICE ESTIMATE & QUOTE', margin + contentWidth, 22, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(107, 114, 128);
  const quoteId = `QUO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  doc.text(`Quote ID: ${quoteId}`, margin + contentWidth, 27.5, { align: 'right' });
  doc.text(`Date: ${today}   |   Valid for 30 Days`, margin + contentWidth, 32, { align: 'right' });

  // Divider Line
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.35);
  doc.line(margin, 38, margin + contentWidth, 38);

  // 3. Metadata columns: PREPARED FOR & PREPARED BY
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text('PREPARED FOR', margin, 46);
  doc.text('PREPARED BY', 115, 46);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(17, 24, 39);
  doc.text(customerName.trim() || 'Valued Customer', margin, 52);
  doc.text('Snapsec Security Inc.', 115, 52);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(75, 85, 99);
  doc.text(customerEmail.trim() || 'customer@organization.com', margin, 57);
  doc.text('support@snapsec.co   |   https://snapsec.co', 115, 57);

  // 4. Table Header (Minimalist: without PRICING TYPE column)
  const tableY = 66;
  doc.setFillColor(24, 24, 27); // Dark black/zinc
  doc.roundedRect(margin, tableY, contentWidth, 9, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  doc.text('MODULE & DESCRIPTION', margin + 4, tableY + 5.8);
  doc.text('UNIT PRICE', 138, tableY + 5.8, { align: 'right' });
  doc.text('ASSETS', 158, tableY + 5.8, { align: 'center' });
  doc.text('SUBTOTAL', margin + contentWidth - 4, tableY + 5.8, { align: 'right' });

  // 5. Table Rows
  let currentY = tableY + 9;
  const rowHeight = 11;

  selectedList.forEach((mod, idx) => {
    const isPA = mod.type === 'Per Asset';
    const ac = assets[mod.id] || 0;
    const lineTotal = isPA ? mod.cost * ac : mod.cost;

    // Alternate background
    if (idx % 2 === 1) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
    }

    // Row bottom divider
    doc.setDrawColor(240, 240, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

    // Module name & bracketed title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 24, 39);
    doc.text(mod.name, margin + 4, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(107, 114, 128);
    doc.text(`(${mod.fullName})`, margin + 16, currentY + 7);

    // Unit Price
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(55, 65, 81);
    doc.text(fmt(mod.cost), 138, currentY + 7, { align: 'right' });

    // Assets
    doc.setTextColor(isPA ? 17 : 156, isPA ? 24 : 163, isPA ? 39 : 175);
    doc.text(isPA ? String(ac) : '—', 158, currentY + 7, { align: 'center' });

    // Subtotal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 24, 39);
    doc.text(fmt(lineTotal), margin + contentWidth - 4, currentY + 7, { align: 'right' });

    currentY += rowHeight;
  });

  // 6. Summary Block
  currentY += 8;
  const totalsX = 110;
  const totalsWidth = margin + contentWidth - totalsX;

  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(totalsX, currentY, margin + contentWidth, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(107, 114, 128);
  doc.text('Modules Selected:', totalsX, currentY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text(
    `${selectedList.length} module${selectedList.length !== 1 ? 's' : ''}`,
    margin + contentWidth - 4,
    currentY,
    { align: 'right' }
  );

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text('Billing Cycle:', totalsX, currentY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('Annual (Billed Yearly)', margin + contentWidth - 4, currentY, { align: 'right' });

  currentY += 6;
  // Total Highlight Box
  doc.setFillColor(244, 244, 245);
  doc.roundedRect(totalsX - 2, currentY, totalsWidth + 2, 14, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text('Estimated Total:', totalsX + 3, currentY + 9);

  doc.setFontSize(13);
  doc.text(`${fmt(total)} /yr`, margin + contentWidth - 2, currentY + 9, { align: 'right' });

  // 7. Notes on Left
  const notesY = currentY - 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(17, 24, 39);
  doc.text('NOTES & ESTIMATE TERMS', margin, notesY + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(107, 114, 128);
  doc.text('• All prices in USD based on annual commitment.', margin, notesY + 8);
  doc.text('• Enterprise SLA, support & onboarding included.', margin, notesY + 13);
  doc.text('• To finalize or request custom terms, contact support@snapsec.co', margin, notesY + 18);

  // 8. Footer
  const footerY = 270;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.35);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(156, 163, 175);
  doc.text('Snapsec Security Inc.  •  https://snapsec.co  •  support@snapsec.co', margin, footerY + 6);
  doc.text('Confidential Estimate  •  Generated for customer review', margin + contentWidth, footerY + 6, {
    align: 'right',
  });

  // 9. Save PDF to browser download
  const sanitizedName = (customerName || 'quote').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filename = `snapsec-quote-${sanitizedName}-${quoteId.toLowerCase()}.pdf`;
  doc.save(filename);
};
