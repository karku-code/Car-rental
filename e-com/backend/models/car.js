import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  rent: Number,
  image: String,
  location: String,
  fuel: String,
  run: String,
  sheat: Number,
  desc: String,
  features: [String]
});

const Car = mongoose.model("Car", carSchema);

export default Car;
