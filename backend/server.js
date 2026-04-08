import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js"

const app = express();

dotenv.config();
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("db connected"))
.catch((err)=> console.log(err));
console.log(process.env.MONGO_URI);
app.get('/', (req,res)=>{
    res.send("kyc backend is running");
});

app.listen(3000,()=>{
console.log("server running on port 3000");
})