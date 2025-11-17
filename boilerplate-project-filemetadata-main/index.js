// Paquetes principales
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Multer para la subida de archivos
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Inicializar la app Express
const app = express();

// Middlewares
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ======================================================
//   Ruta requerida por freeCodeCamp: /api/fileanalyse
//   Debe devolver name, type y size del archivo subido
// ======================================================
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

// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
