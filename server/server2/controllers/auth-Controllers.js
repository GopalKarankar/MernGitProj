const User = require("../models/user-Model");
const bcrypt = require("bcryptjs");


// this file defines body of different components


// Home component
const home = async (req, res) => {
    try {
        res.status(200).json("Welcome to auth api 1234");
    } catch (error) {
        res.status(400).json({ msg: "Page not found." });
    }
};


// Register component
const register = async (req, res) => {

    try {

        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(200).json({ msg: "Email already exists." });
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            phone,
            password
        });

        // Generate token
        const token = await newUser.generateToken();

        res.status(201).json({
            msg: "User registered successfully.",
            // user: token,
            token,
            userId: newUser._id.toString()
        });

        // res.status(201).send("register page.");

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
};


// login page 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        // const isMatch = bcrypt.compare(222,213);

        console.log(userExist);
        console.log(password);
        console.log(userExist.password);

        if (isMatch) {

            return res.status(200).json({
                msg: "Login successful.",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });

        } else {

            return res.status(401).json({ msg: "Invalid email or password." });
        
        }
    
    } catch (error) {
        res.status(500).json( "Internal server error." );
    }
};


const user = async (req , res) => {

    try{
        
        const userData = req.user;
        console.log("userdata ",userData);

       return res.status(200).json({ userData });

    }catch(error){
        console.log(`Error from the user route ${error}`);
    };
};

module.exports = { home, register, login, user };
