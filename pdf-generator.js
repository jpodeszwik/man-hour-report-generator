const PdfPrinter = require('pdfmake');
const base64 = require('base64-stream');

const fonts = {
  DejaVuSans: {
    normal: 'node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf',
    bold: 'node_modules/dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf',
  },
};

const printer = new PdfPrinter(fonts);

const generateDocument = (documentDefinition) => {
  return new Promise(function (resolve) {
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

module.exports = generateDocument;
