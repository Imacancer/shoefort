import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

  router.use(express.json());


  router.get('/:id', async (req, res) => {
    const productId = req.params.id; // Extract product ID from URL parameter
  
    try {
      // Fetch the product with the specified ID along with its variants
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          variants: {
            include: {
              colors: true
            }
          }
        }
      });
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



  export default router;