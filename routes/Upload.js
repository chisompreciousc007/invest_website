const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');


router.post('/', (req, res) => {
    if (req.files == null) {
        return res.status(400).json({ msg: 'No file Uploaded' })
    }
    const file = req.files.file;
    const uuidfilename = uuidv4();
    const ext = path.extname(file.name);
    // file.mv(`client/public/uploads/${uuidfilename}${ext}`, err => {
    file.mv(`client/src/components/boostrapdashboard/uploads/${uuidfilename}${ext}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err)
        }

        res.json({ filename: uuidfilename, filePath: `/uploads/${uuidfilename}${ext}` });



    });
});




module.exports = router;