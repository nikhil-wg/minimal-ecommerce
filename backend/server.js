import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// ====== Step 1: Product Schema (optional if you want DB later) ======
// For now we’ll keep hardcoded products, but this is how schema looks
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   imageUrl: String
// });
// const Product = mongoose.model("Product", productSchema);

// ====== Step 2: Hardcoded Products ======
const products = [
  { id: 1, name: "Laptop", price: 60000, imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "Phone", price: 20000, imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", price: 2000, imageUrl: "https://via.placeholder.com/150" },
  { id: 4, name: "Watch", price: 3000, imageUrl: "https://via.placeholder.com/150" },
  { id: 5, name: "Keyboard", price: 1000, imageUrl: "https://via.placeholder.com/150" }
];

// ====== Step 3: Routes ======

// Root route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// GET /products → return hardcoded product list
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /checkout → receive cart, log, and respond
app.post("/checkout", (req, res) => {
  const { cart } = req.body;
  console.log("🛍 Order received:", cart);
  res.json({ success: true, message: "Order placed successfully!" });
});

// ====== Step 4: Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
