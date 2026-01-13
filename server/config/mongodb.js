import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on("connected", () => console.log("Database connected"));

    // Use the URI as provided in environment variables to avoid
    // accidental connection to a different database name.
    await mongoose.connect(process.env.MONGODB_URI);
};  

export default connectDB;