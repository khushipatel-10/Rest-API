require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductJson = require("./products.json");

// Function to remove duplicates
// const removeDuplicates = async () => {
//     try {
//         const products = await Product.find({});
        
//         const seen = {};
//         for (const product of products) {
//             const key = `${product.title}-${product.price}`; // Define a unique key based on title and price
//             if (seen[key]) {
//                 await Product.deleteOne({ _id: product._id });
//                 console.log(`Deleted duplicate product: ${product.title}`);
//             } else {
//                 seen[key] = true;
//             }
//         }
//     } catch (err) {
//         console.log("Error:", err);
//     }
// };

// Main function to start the process
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);

        // Import products from JSON
        // for (const product of ProductJson) {
        //     const existingProduct = await Product.findOne({ title: product.title, price: product.price });
        //     if (!existingProduct) {
        //         await Product.create(product);
        //         console.log(`Inserted: ${product.title}`);
        //     } else {
        //         console.log(`Product already exists: ${product.title}`);
        //     }
        // }
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("ProductJson import completed");

        // Call the function to remove duplicates after products are imported
        // await removeDuplicates();

    } catch (err) {
        console.log("Error:", err);
    }
};

// Start the process
start();
