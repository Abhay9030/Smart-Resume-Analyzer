const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

async function parseResume(file) {
  try {
    const ext = path.extname(file.originalname).toLowerCase();
    const filePath = file.path;

    console.log("📎 Parsing resume:", file.originalname);
    console.log("📁 Full path:", filePath);

    if (ext === ".pdf") {
      const data = fs.readFileSync(filePath);
      const parsed = await pdfParse(data);
      return parsed.text;
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      console.warn("⚠️ Unsupported file type:", ext);
      throw new Error("Unsupported file format. Only PDF and DOCX are supported.");
    }
  } catch (err) {
    console.error("❌ Error in parseResume:", err);
    throw err; // Rethrow to be caught in the route
  }
}

module.exports = { parseResume };
