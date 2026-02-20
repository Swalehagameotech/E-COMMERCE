const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  original_price: {
    type: Number
  },
  discounted_price: {
    type: Number
  },
  stock: {
    type: Number,
    default: 0
  },
  stars: {
    type: Number,
    default: 0
  },
  brand_name: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FeaturedProduct', featuredProductSchema);
