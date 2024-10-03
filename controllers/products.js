const Product = require("../models/product");

const getAllProducts = async (req, res) => {

    const {rating, price, title, sort, select} = req.query;
    const queryObj={};

    if (rating){
        queryObj.rating=rating;
        console.log(rating);    
    }
    if (price){
        queryObj.price=price;
        console.log(price);    
    }
    if (title){
        queryObj.title={ $regex: title, $options: 'i'};
        console.log(title);    
    }

    let normalData = Product.find(queryObj);

    if (sort){
        let sortFix=sort.split(",").join(" ");
        normalData=normalData.sort(sortFix);
    }
    if (select){
        let selectFix=select.split(",").join(" ");
        normalData=normalData.select(selectFix);
    }

    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) || 3;
    let skip=(page-1)*limit;

    normalData=normalData.skip(skip).limit(limit);

    console.log(queryObj);
    
    const myData = await normalData;
    res.status(200).json({ myData });
};

//collation for case insensitive sorting

const getAllProductsTesting = async (req, res) => {
    console.log(req.query);
    const myData = await Product.find(req.query).skip(2);
    // sort = name,price;
  
    res.status(200).json({ myData, nbHits: myData.length });
  };
  

// const getAllProductsTesting = async (req, res) => {
//     const {rating, price, title, sort, select} = req.query;
//     const queryObj={};

//     if (rating){
//         queryObj.rating=rating;
//         console.log(rating);    
//     }
//     if (price){
//         queryObj.price=price;
//         console.log(price);    
//     }
//     if (title){
//         queryObj.title={ $regex: title, $options: 'i'};
//         console.log(title);    
//     }

//     let normalData = Product.find(queryObj).collation({ locale: 'en', strength: 2 });

//     if (sort){
//         let sortFix=sort.split(",").join(" ");
//         normalData=normalData.sort(sortFix);
//     }
//     if (select){
//         let selectFix=select.split(",").join(" ");
//         normalData=normalData.select(selectFix);
//     }

//     let page=Number(req.query.page) || 1;
//     let limit=Number(req.query.limit) || 3;
//     let skip=(page-1)*limit;

//     normalData=normalData.skip(skip).limit(limit);

//     console.log(queryObj);

//     const myData = await normalData;
//     res.status(200).json({ myData });
// };

module.exports = { getAllProducts, getAllProductsTesting };
