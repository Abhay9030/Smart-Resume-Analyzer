const express = require("express");
const cors = require("cors");
const analyzeRouter = require("./routes/analyze");

const app = express();
app.use(cors());
app.use(express.json());

// API route
app.use("/api/analyze", analyzeRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
