const express = require('express');
const router = express.Router();
const {
  getFeaturedProducts,
  getFeaturedProductById
} = require('../controllers/featuredProductController');

router.get('/', getFeaturedProducts);
router.get('/:id', getFeaturedProductById);

module.exports = router;
