const express = require('express');
const { getProductDetails } = require('../controllers/productController');

const router = express.Router();

// Route to fetch product
router.post('/fetch-product', getProductDetails);

module.exports = router;
