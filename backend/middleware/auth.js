import JWT from "jsonwebtoken";

const authMiddleware = (req, res, next) =>{
    try{
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({message: "No token"});
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user= decoded;
    next();
    }
    catch(err){
    res.status(401).json({error:"Invalid token"});
    }
};

export default authMiddleware;