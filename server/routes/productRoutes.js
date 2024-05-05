import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    // Fetch all products with associated details
    const products = await prisma.product.findMany({
      take: 10, // Limit the number of products to 10
      include: {
        variants: {
          include: {
            colors: true,
          },
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { product_name, status = true, featured = false, imgUrl } = req.body;

    // Create the product
    const createdProduct = await prisma.product.create({
      data: {
        product_name,
        status,
        featured,
        imgUrl,
      },
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
