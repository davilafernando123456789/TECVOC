const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  id: Number,
  texto: String,
  opciones: [
    {
      texto: String,
      valor: String,
    },
  ],
});

const carreraSchema = new mongoose.Schema({
  nombre: String,
  criterios: [
    {
      pregunta: Number,
      respuesta: String,
      puntaje: Number,
    },
  ],
});

const cuestionarioSchema = new mongoose.Schema({
  Preguntas: [preguntaSchema],
  Carreras: [carreraSchema],
}, { collection: 'cuestionario' }); // Especifica el nombre de la colección

const Cuestionario = mongoose.model('Cuestionario', cuestionarioSchema);

module.exports = Cuestionario;
