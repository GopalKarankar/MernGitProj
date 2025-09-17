const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// This file defines JSON structure


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate emails
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});


// json web token
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }

});

userSchema.methods.generateToken = function () {
    try {

        return jwt.sign(

            {
                userId: this._id.toString(), // Fixed parentheses
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
            
        );

    } catch (error) {

        console.log(error);

    }

};

const User = mongoose.model("User", userSchema);

module.exports = User;
