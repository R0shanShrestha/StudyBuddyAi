const pdf = require("pdf-parse");
const fs = require("fs");
// const fs = require(fs);

const extractTextFromPDF = async (filePath) => {
  const pdfBuffer = fs.readFileSync(filePath); // Read the PDF as a buffer
  const data = await pdf(pdfBuffer); // Extract text from the PDF
  return data.text; // Returns the text content of the PDF
};

module.exports = extractTextFromPDF;
