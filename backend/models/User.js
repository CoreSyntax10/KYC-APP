import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type: String,
        default:'user'
    },
    kycDocument: String,
    kycStatus:{
        type: String,
        default: "pending"
    }
});

export default mongoose.model("User",userSchema);
