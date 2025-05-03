import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Product from "./models/Product";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('products');
        await db.dropCollection('categories');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const [john, jane] = await User.create(
        {
            username: "john",
            password: "123",
            displayName: "John Doe",
            phoneNumber: "+9999999",
            token: crypto.randomUUID()
        },
        {
            username: "jane",
            password: "123",
            displayName: "Jane Doe",
            phoneNumber: "+8888888",
            token: crypto.randomUUID()
        }
    );

    const [computers, cars, clothing] = await Category.create(
        {
            title: "Computers",
            description: "Computer devices and gadgets"
        },
        {
            title: "Cars",
            description: "Cars for sale"
        },
        {
            title: "Clothing",
            description: "Fashion clothing"
        }
    );

    await Product.create(
        {
            category: computers._id,
            title: "CPU",
            description: "New CPU for your best experience",
            price: 600,
            image: "fixtures/cpu.jpeg",
            seller: john._id
        },
        {
            category: computers._id,
            title: "Laptop",
            description: "Powerful laptop for work and gaming",
            price: 2500,
            image: "fixtures/laptop.jpeg",
            seller: john._id
        },
        {
            category: cars._id,
            title: "Kia K5",
            description: "Bishkek's most favourite",
            price: 10000,
            image: "fixtures/kia.jpeg",
            seller: jane._id
        },
        {
            category: clothing._id,
            title: "T-Shirt",
            description: "Cotton t-shirt",
            price: 10,
            image: "fixtures/t-shirt.jpeg",
            seller: jane._id
        }
    );

    await db.close();
};

run().catch(console.error);