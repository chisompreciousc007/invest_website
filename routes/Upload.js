const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");

router.post("/", (req, res) => {
  try {
  } catch (error) {}

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.file;
  const uuidfilename = uuidv4();
  const ext = path.extname(file.name);
  const filesize = file.size;
  const filetype = file.mimetype;
  if (filesize >= 1000000) throw new Error("File exceeds 1mb");

  file.mv(`client/public/uploads/${uuidfilename}${ext}`, (err) => {
    // file.mv(`client/src/components/boostrapdashboard/uploads/${uuidfilename}${ext}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    console.log("image saved");

    res.json({
      fileName: uuidfilename,
      filePath: `${uuidfilename}${ext}`,
    });
  });
});

module.exports = router;
