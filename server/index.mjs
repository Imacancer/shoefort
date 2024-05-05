import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const PORT = 4001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
