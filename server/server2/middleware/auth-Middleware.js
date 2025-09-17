const jwt = require('jsonwebtoken');
const User = require("./../models/user-Model");

const authMiddleware = async (req, res, next) => {

    const token =  req.header("Authorization");

    if(!token){
        return res.status(401).json({msg:"Unauthorized, No token provided."});
    }

    const jwtToken = token.replace("Bearer","").trim();

    console.log("Token from auth middleware", jwtToken);

    try{

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        console.log("isVerified : ", isVerified);

        const userData = await User.findOne({email: isVerified.email}).select({ password:0, });

        console.log("UserId 1 : ", userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();

    }catch(error){
        return res.status(401).json({msg:"Unauthorized, invalid token."});
    }

};

module.exports = authMiddleware;