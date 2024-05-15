import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();
const router = express.Router();


dotenv.config();

router.use(express.json());


router.post("/", async (req, res) => {
  const { customerId, productId, amount, payment_method } = req.body;

  try {
    // Create transaction in the database
    const newTransaction = await prisma.transaction.create({
      data: {
        customerId: customerId,
        productId: productId,
        amount: amount,
        payment_method: payment_method,
      },
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/update-transaction", async (req, res) => {
  const { customerId, paymentMethod } = req.body;

  try {
    // Update transactions in the database
    const updatedTransactions = await prisma.transaction.updateMany({
      where: { customerId: customerId, trannsaction_status: 'pending' },
      data: {
        payment_method: paymentMethod,
        trannsaction_status: 'completed'
      }
    });

    res.status(200).json({ message: 'Transactions updated successfully', updatedTransactions });
  } catch (error) {
    console.error("Error updating transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
