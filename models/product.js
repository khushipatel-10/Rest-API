const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    "title": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: [true, "Cost is needed"]
    },
    "category": {
        type: String,
        required: true
    },
    "rating": {
        type: Number,  
        required: false
    }
});

module.exports = mongoose.model("Product", productSchema);
