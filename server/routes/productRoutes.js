const express = require('express');
const { getAllProducts, getProductDetails,getProduct,getProductByTitle} = require('../controllers/productController');

const router = express.Router();

router.get('/all', getAllProducts); 

router.post('/fetch-product', getProductDetails);
router.get('/:id',getProduct);
router.get('/', getProductByTitle);

module.exports = router;
