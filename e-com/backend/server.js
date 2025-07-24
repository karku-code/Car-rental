
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import path from "path";
import Admin from "./models/adminSchema.js";
import { fileURLToPath } from "url";

import User from "./models/useSchema.js";
import Books from "./models/book.js";
import carRoutes from "./routes/cars.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 6969;


app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/cars', carRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/car", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(" DB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));



app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(200).json("Registered Successfully");
  } catch (err) {
    res.status(500).json("Register failed");
  }
});



app.post('/login', async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "invalid password" });

    res.json({
  msg: "login successfully",
  username: user.username,
 
});

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});



app.post("/book", async (req, res) => {
  const { pickup, returnTo, carData, booking } = req.body;

  try {
    if (!pickup || !returnTo || !carData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const bookingDate = booking?.date || new Date().toISOString();
    const username = booking?.username || "Guest";

    const pickupDate = new Date(pickup);
    const returnDate = new Date(returnTo);
    const diffDays = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = diffDays * carData.rent;

    const newBooking = new Books({
      pickup,
      returnTo,
      carData,
      booking: {
        date: bookingDate,
        username,
        totalPrice
      }
    });

    await newBooking.save();

    res.status(200).json({
      message: "Booking successful",
      car: carData,
      booking: {
        pickup,
        returnTo,
        totalPrice,
        date: bookingDate,
        username
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});



app.post('/admin/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, email, password: hash });
    await admin.save();
    console.log("✅ Admin saved:", admin);
    res.status(200).json("Admin Registered Successfully");
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json("Admin Registration failed");
  }
});



app.post('/admin/login', async (req, res) => {
  const { password, email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.json({
      msg: "Admin login successful",
      username: admin.username,
      email: admin.email
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});




app.listen(PORT, () => {
  console.log(`🚗 Server running on http://localhost:${PORT}`);
});
