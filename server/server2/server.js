require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const authRoute = require("./router/auth-Router");
const contactRoute = require("./router/contact-Router");
const serviceRoute = require("./router/service-Router");
const adminRoute = require("./router/admin-Router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-Middleware");

app.use(express.json());


app.use(cors({
  origin: "https://merngitprojfrontend.onrender.com", // Vite default port
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  credentials:true,
}));

app.use("/api/auth",authRoute);
app.use("/api/form/",contactRoute);
app.use("/api/data/",serviceRoute);
app.use("/api/admin/",adminRoute);

app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(()=>{

        app.listen(PORT,()=>{
    
            console.log(`server is running at port ${PORT}`);
        
        });

});

