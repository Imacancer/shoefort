import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const colorNames = [
  "red",
  "black",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
];

// Function to convert shoe size from US to UK and CM
function generateRandomSize() {
  // Define an array of possible shoe sizes
  const sizes = [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "U0.5",
    "11",
    "11.5",
    "12",
  ];

  // Randomly select a size from the array
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  return randomSize;
}
function generateRandomBoolean() {
  return Math.random() < 0.5; // Returns true 50% of the time, false 50% of the time
}

function generateRandomColorName() {
  // Randomly select a color name from the array
  const randomColorName =
    colorNames[Math.floor(Math.random() * colorNames.length)];
  return randomColorName;
}

async function clearDatabase() {
  await prisma.colorVariant.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  console.log("Database cleared");
}

async function seedDatabase() {
  await clearDatabase();

  const hashedPassword = await bcrypt.hash("password", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "John Doe",
      password: hashedPassword,
      email: "admin@gmail.com",
      role: "admin",
    },
  });

  const users = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    password: hashedPassword, // Generate random passwords
    name: faker.person.fullName(),
  }));

  // Create users and customers in the database
  for (const userData of users) {
    const createdUser = await prisma.user.create({
      data: userData,
    });

    await prisma.customer.create({
      data: {
        user: {
          connect: { id: createdUser.id }, // Connect to the created user
        },
      },
    });

    console.log("User and Customer created:", createdUser);
  }

  const productsData = [];

  // Generate 200 products related to shoes
  for (let i = 0; i < 10; i++) {
    const productName = faker.commerce.productName() + " Shoes"; // Ensure product is related to shoes
    const price = faker.number.int({ min: 10, max: 500 });
    const quantity = faker.number.int({ min: 1, max: 500 });
    const size = generateRandomSize();
    const categories = ["Mens", "Womens", "Kids"];
    const img = "https://placehold.co/600x400";
    const category = categories[Math.floor(Math.random() * categories.length)];
    const colorVariants = [
      { value: generateRandomColorName() },
      { value: generateRandomColorName() },
    ];

    productsData.push({
      product_name: productName,
      status: true,
      imgUrl: img,
      featured: generateRandomBoolean(),
      variants: [
        {
          price: price,
          qty: quantity,
          category: category,
          size: size,
          colors: colorVariants,
        },
      ],
    });
  }

  // Create products in the database
  for (const productData of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        product_name: productData.product_name,
        status: productData.status,
        featured: productData.featured,
        imgUrl: productData.imgUrl,
        variants: {
          create: productData.variants.map((variant) => ({
            price: variant.price,
            qty: variant.qty,
            size: variant.size,
            category: variant.category,
            colors: {
              create: variant.colors.map((color) => ({
                value: color.value,
              })),
            },
          })),
        },
      },
      include: {
        variants: {
          include: {
            colors: true,
          },
        },
      },
    });

    console.log("Created product:", createdProduct);
    console.log("created adminuser:", adminUser);
  }
}

seedDatabase()
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
