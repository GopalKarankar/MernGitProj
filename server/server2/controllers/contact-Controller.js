const Contact  = require("../models/contact-Model");

const contactForm = async (req, res) => {

    try{

        const response = req.body;
        await Contact.create(response);
        res.status(200).json({msg:"Message sent successfully."});

    }catch(error){

           res.status(500).json({msg:"Failed to send message."}); 
           
    }
};

module.exports = contactForm;