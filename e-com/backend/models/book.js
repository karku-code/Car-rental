import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  pickup: String,
  returnTo: String,
  carData: {
    brand: String,
    model: String,
    img: String,
    sheat: Number,
    fuel: String,
    run: String,
    location: String,
    rent: Number,
    f1: String,
    f2: String,
    f3: String,
    f4: String,
    f5: String
  },
  booking: {
    date: String,        
    username: String,    
    totalPrice: Number  
  }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
