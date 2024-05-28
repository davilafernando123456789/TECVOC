const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

router.post('/register', async (req, res) => {
  const { email, password, role, name, surname, age, educationLevel, acceptTerms } = req.body;

  try {
    if (role === "user" && (!name || !surname || !age || !educationLevel || !acceptTerms)) {
      return res.status(400).json({ message: 'All fields are required for user registration' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({ email, password: hashedPassword, role, name, surname, age, educationLevel, acceptTerms });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role, userName: newUser.name }, 'your_jwt_secret', { expiresIn: '1h' });
    
    res.status(200).json({ token, role: newUser.role, userName: newUser.name, email: newUser.email });
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role, userName: user.name }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, role: user.role, userName: user.name, email: user.email });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Failed to login', error: err.message });
  }
});

module.exports = router;



// // Ruta para iniciar sesión
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(`Login attempt for email: ${email}`);

//   try {
//     const db = await conectarMongoDB(); // Obtener la conexión a MongoDB
//     const usersCollection = db.collection('users'); // Obtener la colección de usuarios

//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       console.log('Invalid password');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role, userName: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Failed to login', error: err.message });
//   }
// })