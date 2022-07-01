const mongoose = require('mongoose');

const connectDatabase = async () => {
    var mongoDB = 'mongodb+srv://user123:user123@mini-mern-tut.sow4r.mongodb.net/blog?retryWrites=true&w=majority';
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }



}

module.exports = connectDatabase;