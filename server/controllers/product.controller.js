const Product = require("../models/Product");


exports.getProductsList = async(req,res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
}

exports.createProduct = async (req,res) => {
  try {
    
    const { productName, price } = req.body;
    let image_url;

    if (req.file) {
      image_url = `/images/products_images/${req.file.filename}?v=${Date.now()}`; // This URL can be accessed on the frontend
    }
    console.log(req.file)
    // Check if product exists
    let existingProduct = await Product.findOne({productName});
    if(existingProduct){
      return res
      .status(400)
      .json({message:"Product with same name exists"})
    }
  const newProduct = new Product({
    productName,
    price,
    image_url
  })
  // Save product to database
  await newProduct.save();
  res.status(201).json(newProduct)
  }
  catch(error){
    console.log(error)
res.status(500).json({message: "Server error",error});
  }
}