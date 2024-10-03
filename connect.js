const mongoose = require("mongoose");

// uri = "mongodb+srv://khushipatel:bdKZZUdFWnEX67pT@zuapi.7wlvh.mongodb.net/";

const connectDB = (uri) => {
    console.log("Connected to DB");
    return mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology:true
    });
};

module.exports = connectDB;