const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  result: { type: String, enum: ['win', 'loss'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', GameSchema);
