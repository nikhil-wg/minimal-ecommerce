import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { products } from "./data/products.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ====== Routes ======

// Root route
app.get("/", (req, res) => {
  res.send("🚀 MyShop API is running! Available endpoints: GET /products, POST /checkout");
});

// GET /products → return product list
app.get("/products", (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching products",
      error: error.message 
    });
  }
});

// GET /products/:id → return single product
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ 
      success: false, 
      message: "Product not found" 
    });
  }
  
  res.json(product);
});

// GET /products/category/:category → filter by category
app.get("/products/category/:category", (req, res) => {
  const category = req.params.category;
  const filtered = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  if (filtered.length === 0) {
    return res.status(404).json({ 
      success: false, 
      message: `No products found in category: ${category}` 
    });
  }
  
  res.json(filtered);
});

// POST /checkout → receive cart, log, and respond
app.post("/checkout", (req, res) => {
  const { cart } = req.body;
  
  if (!cart || cart.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: "Cart is empty" 
    });
  }

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  console.log("🛍️  NEW ORDER RECEIVED");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📦 Items: ${cart.length}`);
  console.log(`💰 Total: ₹${total.toLocaleString('en-IN')}`);
  console.log("Cart details:");
  cart.forEach(item => {
    console.log(`  • ${item.name} x${item.qty} = ₹${(item.price * item.qty).toLocaleString('en-IN')}`);
  });
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  res.json({ 
    success: true, 
    message: "Order placed successfully! 🎉",
    orderId: `ORD-${Date.now()}`,
    total: total,
    items: cart.length
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found", 
    message: `Cannot ${req.method} ${req.path}` 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ 
    success: false,
    message: "Internal server error",
    error: err.message 
  });
});

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("\n🚀 ════════════════════════════════════════");
  console.log(`   MyShop Backend Server`);
  console.log(`   Running on: http://localhost:${PORT}`);
  console.log(`   Products: ${products.length} items`);
  console.log(`   Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
  console.log("🚀 ════════════════════════════════════════\n");
});
