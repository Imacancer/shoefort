const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

dotenv.config();
const prisma = new PrismaClient();
const PORT = 4001;

const app = express();
const jwtSecret = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};





app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing with salt rounds = 10

        // Insert the new customer into the database with hashed password
        const newCustomer = await prisma.customer.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newCustomer.id }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/signup', async (req, res) => {
    try {
        const { email } = req.query;

        // Check if email parameter is provided
        if (!email) {
            return res.status(400).json({ error: 'Email parameter is missing' });
        }

        // Find a user with the provided email
        const existingUser = await prisma.customer.findUnique({
            where: {
                email,
            },
        });

        // If user with the provided email exists, return true, otherwise return false
        const responseMessage = existingUser ? 'Email Already Used' : 'Email Available';

        res.json({ message: responseMessage});
    } catch (error) {
        console.error('Error checking for duplicate email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await prisma.customer.findUnique({
            where: { email },
        });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret , { expiresIn: '1h' });

        console.log(token);
        return res.status(200).json({ token });
        
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.use(['/products', '/'], verifyToken);

app.post('/logout', (req, res) => {
    try {
        // Retrieve the token from the request headers
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Token not provided' });
        }

        // Verify the token
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            // Token is valid, proceed with logout
            // You can optionally use the decoded information if needed
            // For example, const userId = decoded.userId;

            // Respond with a success message
            res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/add-products', async (req, res) => {
    try {
        const { name, categoryId, sizeId, colorId, brand, gender, images, price } = req.body;

        // Check if required fields are provided
        if (!name || !categoryId || !sizeId || !colorId || !brand || !gender || !images || price === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Insert the new shoe product into the database
        const newShoeProduct = await prisma.shoeProduct.create({
            data: {
                name,
                category: { connect: { id: categoryId } }, // Connect to Category table
                size: { connect: { id: sizeId } }, // Connect to Size table
                color: { connect: { id: colorId } }, // Connect to Color table
                brand,
                gender,
                price, // Add the price field
                images: {
                    createMany: {
                        data: images.map(url => ({ url })),
                    },
                }, // Create images
            },
            include: { images: true }, // Include images in the response
        });

        res.status(201).json(newShoeProduct);
    } catch (error) {
        console.error('Error adding shoe product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Adding Values to the Products

app.get('/products', async (req, res) => {
    try {
        // Fetch all products with associated details
        const products = await prisma.shoeProduct.findMany({
            select: {
                id: true,
                name: true,
                category: { select: { name: true } }, // Select category name
                size: { select: { value: true } }, // Select size value
                color: { select: { value: true } }, // Select color value
                brand: true,
                gender: true,
                price: true,
                images: { select: { url: true } }, // Select image URLs
            },
        });

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.post('/add-color', async (req, res) => {
    try {
        const { value } = req.body;

        // Check if value is provided
        if (!value) {
            return res.status(400).json({ error: 'Value is required for color' });
        }

        // Insert the new color into the database
        const newColor = await prisma.color.create({
            data: {
                value,
            },
        });

        res.status(201).json(newColor);
    } catch (error) {
        console.error('Error adding color:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/add-categories', async (req, res) => {
    try {
        const { name } = req.body;

        // Check if name is provided
        if (!name) {
            return res.status(400).json({ error: 'Name is required for category' });
        }

        // Insert the new category into the database
        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });

        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

