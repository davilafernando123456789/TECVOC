// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  name: {
    type: String,
    required: function() { return this.role === 'user'; }
  },
  surname: {
    type: String,
    required: function() { return this.role === 'user'; }
  },
  age: {
    type: Number,
    required: function() { return this.role === 'user'; }
  },
  educationLevel: {
    type: String,
    required: function() { return this.role === 'user'; }
  },
  acceptTerms: {
    type: Boolean,
    required: function() { return this.role === 'user'; }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
