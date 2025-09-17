

const validate = (schema) => async (req, res, next) => {

    try{

        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
        
    }catch(err){

        // 422
        const status = 200; 

        const prsedt = JSON.parse(err);
         const message = prsedt[0].message;

         const error = {status, message };

        //  res.status(400).json({msg:message});
         next(error);
    }

};

module.exports = validate;