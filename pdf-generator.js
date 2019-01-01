import dejaVuSans from 'dejavu-fonts-ttf/ttf/DejaVuSans.ttf';
import dejaVuSansBold from 'dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf';
const base64 = require('base64-stream');
const PdfPrinter = require('pdfmake');

const fonts = {
  DejaVuSans: {
    normal: dejaVuSans,
    bold: dejaVuSansBold,
  },
};

export const generateDocument = (documentDefinition) => {
  return new Promise(function (resolve) {
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(documentDefinition);
    const stream = new base64.Base64Encode();

    pdfDoc.pipe(stream);
    pdfDoc.end();

    var result = '';

    stream.on('end', () => {
      resolve(result);
    });

    stream.on('data', data => {
      result += data;
    });
  });
};
