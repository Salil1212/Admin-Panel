const Product = require("../models/Product");


exports.getProductsList = async(req,res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
}
