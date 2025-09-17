 const mongoose = require('mongoose');

//  const username = encodeURIComponent('yourUsername');
// const password = encodeURIComponent('my@pass:word!');
// const URI = `mongodb://${username}:${password}@127.0.0.1:27017/mernproj`;

//  const URI = "mongodb://127.0.0.1:27017/mernproj";

 const URI = process.env.MONGODB_URI;

const connectDB = async () => {

    try{
        await mongoose.connect(URI);
        console.log("Successfully connected");
    } catch(error) {
        console.error("Database connection failed.");
        process.exit(0);
    }

};

module.exports = connectDB;