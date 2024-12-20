const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Crear la carpeta 'uploads' si no existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configurar Multer para almacenar las imágenes subidas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }  // Limite de 5 MB
});

// Ruta para subir una imagen
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        const filePath = path.join(uploadDir, req.file.filename);
        const maxSize = 1024;  // Redimensionar la imagen para que no supere 1024px de ancho

        // Redimensionar la imagen si es más grande que el tamaño máximo
        await sharp(filePath)
            .resize(maxSize, maxSize, { fit: 'inside' })  // Mantener la imagen proporcional
            .toFile(path.join(uploadDir, 'resized_' + req.file.filename));  // Guardar la imagen redimensionada

        // Eliminar la imagen original si se redimensionó
        fs.unlinkSync(filePath);

        res.json({ imagePath: `/uploads/resized_${req.file.filename}` });
    } catch (err) {
        console.error('Error al procesar la imagen:', err);
        res.status(500).send('Error al procesar la imagen');
    }
});

// Ruta para obtener las imágenes subidas
app.get('/images', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const images = files.filter(file => file.startsWith('resized_')).map(file => `/uploads/${file}`);
        res.json(images);
    });
});

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

