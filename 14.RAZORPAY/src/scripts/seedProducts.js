import mongoose from "mongoose";
import { config } from "../config/config.js";
import productModel from "../models/product.model.js";

const products = [
    {
        title: "Wireless Bluetooth Headphones",
        description: "Over-ear headphones with noise cancellation and a 30-hour battery.",
        amount: 2999,
        currency: "INR"
    },
    {
        title: "Portable Bluetooth Speaker",
        description: "Water-resistant speaker with rich sound and up to 12 hours of playback.",
        amount: 1799,
        currency: "INR"
    },
    {
        title: "Smart Fitness Watch",
        description: "Fitness watch with heart-rate tracking, GPS, and sleep monitoring.",
        amount: 4499,
        currency: "INR"
    },
    {
        title: "Mechanical Keyboard",
        description: "Compact mechanical keyboard with tactile switches and white backlighting.",
        amount: 3299,
        currency: "INR"
    },
    {
        title: "Ergonomic Wireless Mouse",
        description: "Rechargeable wireless mouse with adjustable DPI and ergonomic design.",
        amount: 1299,
        currency: "INR"
    },
    {
        title: "USB-C Fast Charger",
        description: "65W USB-C wall charger with support for fast charging compatible devices.",
        amount: 1599,
        currency: "INR"
    },
    {
        title: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for a more comfortable desk setup.",
        amount: 999,
        currency: "INR"
    },
    {
        title: "1080p Webcam",
        description: "Full HD webcam with a built-in microphone and privacy cover.",
        amount: 2199,
        currency: "INR"
    },
    {
        title: "External SSD 1TB",
        description: "Portable 1TB solid-state drive with USB-C connectivity.",
        amount: 6999,
        currency: "INR"
    },
    {
        title: "Noise-Isolating Earbuds",
        description: "True wireless earbuds with a charging case and touch controls.",
        amount: 2499,
        currency: "INR"
    }
];

try {
    await mongoose.connect(config.mongoUri);

    const result = await productModel.bulkWrite(
        products.map((product) => ({
            updateOne: {
                filter: { title: product.title },
                update: { $set: product },
                upsert: true
            }
        }))
    );

    console.log(
        `Seeded ${products.length} products (${result.upsertedCount} added, ${result.modifiedCount} updated).`
    );
} catch (error) {
    console.error("Failed to seed products:", error);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
