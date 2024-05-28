const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conectarDB = require('./config/db'); // Import the db connection function
const userRoutes = require('./routes/userRoutes');
const testResultsRoutes = require('./routes/testResultsRoutes');
const cuestionarioRoutes = require('./routes/cuestionarioRoutes');

const app = express();
const PORT = 5000;

// Connect to the database
conectarDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Initialize routes
app.use('/api/users', userRoutes);
app.use('/api/test-results', testResultsRoutes);
app.use('/api/cuestionarios', cuestionarioRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Something broke!');
});
