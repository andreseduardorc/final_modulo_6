const express = require('express');
const fs = require('fs');
const path = require('path'); // Importar el módulo path

const app = express();
const port = 3001;

app.use(express.json());

const animeDataPath = path.join(__dirname, 'anime.json'); // Obtener la ruta del archivo anime.json
const animeData = JSON.parse(fs.readFileSync(animeDataPath, 'utf-8')); // Leer los datos del archivo

// Endpoint raíz de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Hola, bienvenido al servidor' });
});

// Listar todos los animes
app.get('/animes', (req, res) => {
  res.json(animeData);
});

// Obtener datos de un anime por su ID
app.get('/animes/:id', (req, res) => {
  const id = req.params.id;
  const anime = animeData[id];

  if (anime) {
    res.json(anime);
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});

// Obtener datos de un anime por su nombre
app.get('/animes/nombre/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const anime = Object.values(animeData).find((anime) => anime.nombre.toLowerCase() === nombre.toLowerCase());

  if (anime) {
    res.json(anime);
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});

// Crear un nuevo anime
app.post('/animes', (req, res) => {
  const id = Object.keys(animeData).length + 1;
  const newAnime = req.body;

  animeData[id] = newAnime;

  fs.writeFileSync('anime.json', JSON.stringify(animeData), 'utf-8');

  res.json({ message: 'Anime creado exitosamente', id: id });
});

// Actualizar los datos de un anime por su ID
app.put('/animes/:id', (req, res) => {
  const id = req.params.id;
  const updatedAnime = req.body;

  if (animeData[id]) {
    animeData[id] = updatedAnime;

    fs.writeFileSync('anime.json', JSON.stringify(animeData), 'utf-8');

    res.json({ message: 'Anime actualizado exitosamente' });
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});

// Eliminar un anime por su ID
app.delete('/animes/:id', (req, res) => {
  const id = req.params.id;

  if (animeData[id]) {
    delete animeData[id];

    fs.writeFileSync('anime.json', JSON.stringify(animeData), 'utf-8');

    res.json({ message: 'Anime eliminado exitosamente' });
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});

// Iniciar el servidor y exportarlo para usarlo en las pruebas
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = server;
