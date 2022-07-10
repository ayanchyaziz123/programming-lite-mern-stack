const mongoose = require('mongoose');

const connectDatabase = async () => {
    var mongoDB = process.env.DB;
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log(error);
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
}

module.exports = connectDatabase;