const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true, unique: true },
    currentPrice: { type: Number },  // Use Number for floats
    imageUrl: { type: String },  // Correct to String and fix typo (imageUrl)
    priceHistory: [{ 
        price: { type: Number }, 
        date: { type: Date, default: Date.now }
    }],
    overallReview: { type: String },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
