
const { localFileUpload } = require('../lib/product.helper');
const { v4: uuidv4 } = require('uuid');


exports.productImageUpload = (req, res, next) => { 
  try {
    
    localFileUpload(
      'image',
      'images/products_images',
      () => `product-img-${uuidv4()}`,
      'image'
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
