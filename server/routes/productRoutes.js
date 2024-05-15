import express from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.diskStorage({
  destination: '/tmp/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
    }
  }
});

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

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    // Fetch variants for the selected product
    const variants = await prisma.variant.findMany({
      where: {
        productId: productId, // Filter variants by product ID
      },
      include: {
        colors: true,
      },
    });

    res.json(variants);
  } catch (error) {
    console.error("Error fetching variants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { product_name, status, featured } = req.body;
    // Convert status and featured strings into boolean values
    const parsedStatus = status === 'true';
    const parsedFeatured = featured === 'true';
    const file = req.file; // Get the uploaded file

    console.log(file);
    console.log(file.filename);

    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'products', // Optional, replace with your folder name
      transformation: [{ width: 500, height: 500, crop: 'limit' }], // Resize uploaded images
      invalidate: true // Keep original file format
    });

    // Create the product with the image URL from Cloudinary
    const createdProduct = await prisma.product.create({
      data: {
        product_name,
        status: parsedStatus,
        featured: parsedFeatured,
        imgUrl: result.secure_url // Image URL from Cloudinary
      }
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/:id", async (req, res) => {
  try {
    const { price, size, category, color, status, qty } = req.body;
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the variant with the provided data
    const createdVariant = await prisma.variant.create({
      data: {
        productId,
        price: parseInt(price), // Convert price to integer
        size,
        category, // Set category if provided
        status,
        qty: parseInt(qty), // Convert qty to integer
        colors: color
          ? {
              create: {
                value: color,
                status: true,
              },
            }
          : undefined, // Create color variant if provided
      },
      include: {
        colors: true,
      },
    });

    res.status(201).json(createdVariant);
  } catch (error) {
    console.error("Error creating variant:", error);
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
