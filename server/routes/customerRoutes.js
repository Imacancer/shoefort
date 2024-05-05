import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    // Fetch all products with associated details
    const customers = await prisma.customer.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    res.json(customers);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
