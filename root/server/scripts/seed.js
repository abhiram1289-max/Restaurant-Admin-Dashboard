import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

await MenuItem.deleteMany();
await Order.deleteMany();

const menuItems = await MenuItem.insertMany([
  { name: "Burger", category: "Main Course", price: 120, ingredients: ["Bread","Patty"] },
  { name: "Pizza", category: "Main Course", price: 250 },
  { name: "Coke", category: "Beverage", price: 40 },
  { name: "Ice Cream", category: "Dessert", price: 80 },
  { name: "Fries", category: "Appetizer", price: 60 }
]);

await Order.insertMany([
  {
    orderNumber: "ORD-1001",
    items: [{ menuItem: menuItems[0]._id, quantity: 2, price: 120 }],
    totalAmount: 240,
    customerName: "Rahul",
    tableNumber: 3
  }
]);

console.log("Seed data inserted");
process.exit();
