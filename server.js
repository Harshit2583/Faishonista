import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import cartRoutes from "./routes/cartRoute.js";

//configure env
dotenv.config();

//databse config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the React app
const buildPath = path.join(__dirname, 'client', 'build');
if (process.env.NODE_ENV === 'production') {
  console.log('Serving static files from:', buildPath);
  app.use(express.static(buildPath));
}

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    console.log('Serving index.html from:', path.join(buildPath, 'index.html'));
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.bgCyan.white
  );
});
