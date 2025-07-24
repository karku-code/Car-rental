import mongoose from "mongoose";

const schema = mongoose.Schema({
    username:String,
    password:String,
    email:String,
  
}, );



export default mongoose.model("login",schema)