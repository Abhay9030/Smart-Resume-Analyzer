const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { matchSkills } = require("../utils/matchSkills");
const { parseResume } = require("../utils/parseResume");

const router = express.Router();

// File upload config
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const resumeFile = req.file;
    const jobDesc = req.body.jobDesc;

    console.log("🔍 Uploaded file:", resumeFile);
    console.log("📝 Job Description:", jobDesc);

    if (!resumeFile || !jobDesc) {
      console.log("⚠️ Missing resume or jobDesc");
      return res.status(400).json({ error: "Missing resume or job description" });
    }

    // Extract resume text (PDF or DOCX)
    const resumeText = await parseResume(resumeFile);
    console.log("📄 Resume text extracted:", resumeText.slice(0, 100)); // First 100 chars

    // Delete uploaded file to save space
    fs.unlinkSync(path.join(__dirname, `../${resumeFile.path}`));
    console.log("🗑️ Uploaded file deleted.");

    // Match skills
    const result = matchSkills(resumeText, jobDesc);
    console.log("✅ Match result:", result);

    return res.json(result);
  } catch (error) {
    console.error("🔥 Error in /api/analyze route:", error);
    res.status(500).json({ error: "Server error during analysis" });
  }
});

module.exports = router;
