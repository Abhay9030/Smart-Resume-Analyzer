import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile || !jobDesc) {
      alert("Please upload resume and paste job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDesc", jobDesc);

    try {
      const res = await axios.post("/api/analyze", formData);
      setResult(res.data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Smart Resume Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <label>Upload Resume:</label><br />
        <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} /><br /><br />

        <label>Job Description:</label><br />
        <textarea
          rows="6"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description here"
        /><br /><br />

        <button type="submit">Analyze</button>
      </form>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p><strong>Match Score:</strong> {result.matchScore}%</p>
          <p><strong>Matched Skills:</strong> {result.matchedSkills.join(", ")}</p>
          <p><strong>Missing Skills:</strong> {result.missingSkills.join(", ")}</p>
          <ul>
            {result.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
