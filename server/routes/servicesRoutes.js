import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();
const router = express.Router();

dotenv.config();

router.use(express.json());

// POST request to create a new service
router.post("/", async (req, res) => {
  try {
    const { name, email, service, day, month, year, comments, customerId } = req.body;

    // Validate request data
    if (!name || !email || !service || !day || !month || !year || !comments || !customerId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create the service in the database
    const newService = await prisma.services.create({
      data: {
        Name: name,
        email,
        typeorService: service,
        reservation_date: new Date(year, month - 1, day), // Month is 0-indexed
        message: comments,
        customerId
      }
    });

    // Return success response
    res.status(201).json({ message: "Service request created successfully.", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service. Please try again later." });
  }
});

export default router;
