const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user with the same email exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create new user instance
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Hashing of password will be done in middleware
      role,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createProduct = async (req,res) => {
  try {
    
    const { productName, price } = req.body;
    let image_url;

    // Use the local file path if the file is uploaded locally
    // if (req.file) {
    //   image_url = `${req.file.path}?v=${Date.now()}`; // `req.file.path` will contain the local file path
    // }
    if (req.file) {
      image_url = `/images/products_images/${req.file.filename}?v=${Date.now()}`; // This URL can be accessed on the frontend
    }
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