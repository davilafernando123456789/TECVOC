const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult'); // Modelo de resultados de pruebas (asegúrate de tener este modelo)

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db; // Get the db instance from app locals
    const results = await db.collection('testResults').find().toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching test results:', err);
    res.status(500).json({ message: 'Failed to fetch test results', error: err.message });
  }
});

module.exports = router;
