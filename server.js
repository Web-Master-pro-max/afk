const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware for serving static files (HTML, CSS, JS)
app.use(express.static('public'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'new_uploads_directory/'; // Change to your preferred directory
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/upload', upload.array('files'), (req, res) => {
    res.send('Files uploaded successfully.');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
