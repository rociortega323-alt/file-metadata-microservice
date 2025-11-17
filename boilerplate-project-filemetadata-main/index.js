// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// === Ruta requerida por freeCodeCamp ===
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});
// =======================================

const port = process.env.PORT || 3000;
console.log("Port assigned by Render:", process.env.PORT);

app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
