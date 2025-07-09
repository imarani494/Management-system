const Candidate = require("../models/Candidate");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/resumes";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() !== ".pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
}).single("resume");

exports.createCandidate = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { name, email, phone, jobTitle } = req.body;

      const candidateData = {
        name,
        email,
        phone,
        jobTitle
      };

      if (req.file) {
        candidateData.resumeUrl = req.file.path;
      }

      const candidate = new Candidate(candidateData);
      await candidate.save();

      res.status(201).json(candidate);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }
      next(error);
    }
  });
};

exports.getAllCandidates = async (req, res) => {
  try {
    const { status, jobTitle } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (jobTitle) filter.jobTitle = new RegExp(jobTitle, "i");

    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

exports.updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Reviewed", "Hired"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update candidate status" });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    if (candidate.resumeUrl) {
      fs.unlink(candidate.resumeUrl, (err) => {
        if (err) console.error("Error deleting resume file:", err);
      });
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete candidate" });
  }
};
