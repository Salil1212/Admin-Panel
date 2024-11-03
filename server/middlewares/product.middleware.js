
const { localFileUpload } = require('../lib/product.helper');


exports.productImageUpload = (req, res, next) => { 
  console.log("Hello rishabh");

  try {
    localFileUpload(
      'image',
      'images/products_images',
      (request) => request.body.productName.replace(/\s+/g, '_'),
      'image'
    )(req, res, (error) => { 
      if (error) {
        return res.status(500).json({ message: "File upload error", error });
      }
      next();
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected server error" });
  }
};
