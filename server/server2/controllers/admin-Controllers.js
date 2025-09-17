const User = require("./../models/user-Model");
const Contact = require("./../models/contact-Model");



// get user list 
const getAllUsers = async (req, res, next) => {

    
        try{

            const users = await User.find({},{password:0});
            console.log(users);

            if (!users || users.length === 0) {
                return res.status(401).json({msg:"user invalid."});
            }

            res.status(200).json(users);

            next();

        }catch(error){
            console.log(error);
            next(error);
        }

};



// update user logic
const updateUserById = async (req, res, next) => {

    try{
        const id = req.params.id;
        
        const updatedUserData = req.body;

        console.log(updatedUserData);
        
        const updatedUser = await User.updateOne(

            { _id:id } , 
            
            {
                $set : updatedUserData
            },
            
        );

     res.status(200).json(updatedUser);

    }catch(error){
        console.log(error);
        next(error);
    }
}


// Delete user logic
const deleteUserById = async (req, res) => {

    try{

        const id = req.params.id;

        await User.deleteOne({ _id:id });

        res.status(200).json("user deleted successfully.");

    }catch(error){
        console.log(error);
        next(error);
    }
}



// Get single user logic
const getUserById = async (req, res) => {

    try{

        const id = req.params.id;

        const data = await User.findOne({ _id:id }, {password: 0 });

        res.status(200).json(data);

    }catch(error){
        console.log(error);
    }
}


// Contact part starts **********************

// Get contacts list
const getAllContacts = async (req, res, next) => {

    try{     
        const contact = await Contact.find();

        if (!contact || contact.length === 0) {
            res.status(401).json({msg:"contact invalid."});
        }
        
        res.status(200).json(contact);

    }catch(error){
        console.log(error);
        next(error);
    }

};



// update user logic
const updateContactById = async (req, res, next) => {

    try{
        const id = req.params.id;
        
        const updatedContactData = req.body;

        console.log(updatedContactData);
        
        const updatedContact = await Contact.updateOne(

            { _id:id } , 
            
            {
                $set : updatedContactData
            },
            
        );

     res.status(200).json(updatedContact);

    }catch(error){
        console.log(error);
        next(error);
    }
}


// Delete user logic
const deleteContactById = async (req, res) => {

    try{

        const id = req.params.id;

        await Contact.deleteOne({ _id:id });

        res.status(200).json("Contact deleted successfully.");

    }catch(error){
        console.log(error);
        next(error);
    }
}



// Get single user logic
const getContactById = async (req, res) => {

    try{

        const id = req.params.id;

        const data = await Contact.findOne({ _id:id }, {password: 0 });

        res.status(200).json(data);

    }catch(error){
        console.log(error);
    }
}



// Contact part ends **********************


module.exports = {getAllUsers, deleteUserById, getUserById, updateUserById, getAllContacts, deleteContactById, getContactById, updateContactById  };