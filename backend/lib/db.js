import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then((connection) => console.log("Connected to MongoDB:", connection.connection.host))
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        });
}
