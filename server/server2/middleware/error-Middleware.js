
const errorMiddleware = (error, req, res, next) =>{

    const status = error.status || 500;
    const message = error.message || "Backend Error" ;
    console.log(message);
    const extraDetails = error.extraDetails || "Error from backend";
    
    return res.status(status).json({message,extraDetails});

};

module.exports = errorMiddleware;