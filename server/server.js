require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*", // Allows requests from all origins. Be cautious in production.
    })
);

console.log(process.env.DB_URL)

// MongoDB connection
mongoose.connect(
    process.env.DB_URL,
    {}
);

// Use product routes
app.use("/api/products", productRoutes);

// Star
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});