const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');


// Load environment variables from .env file
dotenv.config();

const app = express();
console.log("JWT Secret:", process.env.JWT_SECRET); // Add this in your server start script

// Middleware
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: "https://lonely-cackle-9rrvj67vx97fpp5x-3000.app.github.dev", // Frontend URL
//   credentials: true, // Allow cookies if necessary
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
//   allowedHeaders: ["Content-Type", "Authorization", "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token", "locale"], // Include headers needed
// }));


// mongoose
//   .connect("mongodb://localhost:27017/userDetails", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));
async function main() {
  try {
    await mongoose.connect(process.env.mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
}

main();
// Routes
app.use('/images', express.static(path.join(__dirname, 'lib/images/products_images')));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/product",require("./routes/product"));
app.get("/", (req, res) => {
  res.json("This is home page");
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
