const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
// const fileUpload = require("express-fileupload");
const fs = require("fs");

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.file;
  const uuidfilename = uuidv4();
  const ext = path.extname(file.name);
  const filesize = file.size;
  if (filesize >= 1000000) return res.status(400).send("File exceeds 1mb");

  file.mv(`client/public/uploads/${uuidfilename}${ext}`, (err) => {
    // file.mv(`client/src/components/boostrapdashboard/uploads/${uuidfilename}${ext}`, err => {
    if (err) {
      console.error("error moving file", err);
      return res.status(500).send(err);
    }
    console.log("image saved");

    res.status(200).json({
      fileName: uuidfilename,
      filePath: `${uuidfilename}${ext}`,
    });
  });
});

module.exports = router;
