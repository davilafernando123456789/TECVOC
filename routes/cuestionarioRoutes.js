const express = require('express');
const router = express.Router();
const { listarCuestionarios } = require('../controllers/cuestionarioController');

router.get('/', listarCuestionarios);

module.exports = router;
