//controllers/cuestionariocontroller
const Cuestionario = require('../models/Cuestionario');

async function listarCuestionarios(req, res) {
  try {
    console.log('Entrando a listarCuestionarios');
    
    const cuestionarios = await Cuestionario.find();
    
    console.log('Cuestionarios encontrados:', cuestionarios);
    
    res.json(cuestionarios);
  } catch (error) {
    console.error('Error al listar los cuestionarios:', error);
    res.status(500).json({ error: 'Error al listar los cuestionarios' });
  }
}

module.exports = {
  listarCuestionarios,
};
