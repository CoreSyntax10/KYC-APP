import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", async(req,res)=>{
try{
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    res.json({message: "user registered"})
}
catch(err){
    res.status(500).json({error:err.message})
}
});

router.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
           return res.status(400).json({message: "User not found"});
        }
        const isMatch =await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:" Wrong Password"});
        }
        const token = JWT.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET
        );
        res.json({token});
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.get("/profile", authMiddleware,(req,res) => {
    res.json({message:"Protected Route", user: req.user });
});

router.get("/admin-data", authMiddleware, isAdmin, (req,res) => {
    res.json({message: "Welcome Admin"});
});

router.post("/upload-kyc", authMiddleware, upload.single("document") , async (req,res)=>{
try{
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.kycDocument =req.file.path;
    await user.save();
    res.json({message: "file uploaded", file: req.file.path})
}
catch(err){
res.status(500).json({ error: err.message })
}
});

router.get("/kyc-status", authMiddleware, async (req,res) => {
    const user = await User.findById(req.user.id);
    res.json({
        kycStatus: user.kycStatus,
        document: user.kycDocument
    });
});

router.put("/kyc-status/:userId", authMiddleware, isAdmin, async (req, res) => {
    const { status } = req.body;

    if (!["pending", "verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(req.params.userId);
console.log(user);
    user.kycStatus = status;
    await user.save();

    res.json({ message: "KYC status updated", status });
  });

router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status) {
      filter.kycStatus = status;
    }

    const users = await User.find(filter).select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;