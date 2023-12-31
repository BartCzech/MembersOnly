const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`MongoDB successfully connected!`);
    } catch (error) {
        console.log(`DB error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;