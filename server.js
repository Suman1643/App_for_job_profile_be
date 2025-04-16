const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");

const jobRoutes = require("./routes/jobRoutes");
const studentRoutes = require("./routes/studentRoutes");
const resumeRoutes = require("./routes/resume");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/jobs", jobRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/resume", resumeRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
