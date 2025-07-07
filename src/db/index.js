import mongoose from "mongoose";
// The DB_NAME constant is no longer needed here, as it will be part of the MONGODB_URI


const connectDB = async () => {
    try {
        // The database name should be included in the MONGODB_URI in your .env file
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("MONGODB CONNECTION ERROR: ", error);
        throw error;
    }
}

export default connectDB;   