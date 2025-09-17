const adminMiddleware = async (req, res, next) => {

    try{
        
        console.log(req.user);

        const adminRole = req.user;
     
        if(!adminRole){
            return res.status(403).json({msg: "Access denied. You are not an admin."});
        }

        // res.status(200).json(req.user);

        next();

    }catch(error){
        next(error);
    }

};

module.exports = adminMiddleware;