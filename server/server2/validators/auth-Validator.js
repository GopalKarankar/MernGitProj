const {z} = require("zod");

const signupSchema = z.object({
    username : z.string({required_error:"Name is required."}).trim().min(3,{msg:"Name must be at least 3 characters."}).max(255,{msg:"name must not be more than 255 characters"}),
    email : z.string({required_error:"Email is required."}).email({message:"Email is not valid."}).trim().min(3,{msg:"Email must be at least 3 characters."}).max(255,{msg:"Email must not be more than 255"}),
    phone : z.string({required_error:"Phone number is required."}).trim().min(10,{msg:"Phone number must be at least 10 characters."}).max(15,{msg:"Phone number must not be more than 15 characters."}),
    password : z.string({required_error:"Password is required."}).min(6,{msg:"Password must be at least 6 characters."}).max(255,{msg:"Password must not be more than 255 characters."})
});

module.exports = signupSchema;