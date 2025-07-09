const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

// Sample skill list (you can expand it)
const skillList = [
  "javascript", "nodejs", "react", "express", "python", "java",
  "html", "css", "mongodb", "mysql", "docker", "aws", "git", "typescript"
];

function extractSkills(text) {
  const words = tokenizer.tokenize(text.toLowerCase());
  return [...new Set(words.filter(word => skillList.includes(word)))];
}

function matchSkills(resumeText, jdText) {
  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jdText);

  const matchedSkills = resumeSkills.filter(skill => jdSkills.includes(skill));
  const missingSkills = jdSkills.filter(skill => !resumeSkills.includes(skill));
  const total = jdSkills.length || 1;
  const matchScore = Math.round((matchedSkills.length / total) * 100);

  const suggestions = [];
  if (matchScore < 70) {
    suggestions.push("Consider adding more relevant skills based on the job description.");
  }
  if (missingSkills.includes("typescript")) {
    suggestions.push("Mention TypeScript if you have experience—it's a common requirement.");
  }

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    suggestions
  };
}

module.exports = { matchSkills };
