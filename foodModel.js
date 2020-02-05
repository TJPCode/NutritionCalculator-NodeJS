//this file is not used yet.

const mongoose = require ('mongoose');

const FoodSchema = new mongoose.Schema({
    foods: {
      id: { type: Number, trim: true, required: true},
      name: { type: Number, required: true},
      kcal: { type: Number, trim: true, required: true},
      prots: { type: Number, trim: true, required: true},
      carbs: { type: Number, trim: true, required: true },
      fat: { type: Number, trim: true, required: true },
      sfat: { type: Number, trim: true, required: true },
      category: { type: Number, trim: true, required: true },
      info: { type: String, trim: true }
    }
  });

  const Foods = mongoose.model('foodModel', FoodSchema);

  module.exports = Foods;