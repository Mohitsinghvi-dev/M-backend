// Import the version 2 of the Cloudinary library and alias it as 'cloudinary' for easier use.
import { v2 as cloudinary } from "cloudinary";
// Import the built-in Node.js 'fs' (File System) module to interact with the file system.
import fs from "fs";

// Configuration
// This section configures the Cloudinary SDK with your account credentials.
cloudinary.config({
    // Your Cloudinary cloud name, retrieved from environment variables for security. Note the typo correction.
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // Your Cloudinary API key, retrieved from environment variables.
    api_key: process.env.CLOUDINARY_API_KEY,
    // Your Cloudinary API secret, retrieved from environment variables.
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Defines an asynchronous function to upload a file to Cloudinary.
// It takes the path of the local file as an argument.
const uploadOnCloudinary = async (localFilePath) => {
    // A try...catch block is used to handle any errors that might occur during the file upload process.
    try {
        // Checks if a local file path was provided. If not, it returns null and stops execution.
        if (!localFilePath) return null;
        // This is the core upload logic. It calls the Cloudinary uploader to upload the file.
        const response = await cloudinary.uploader.upload(localFilePath, {
            // 'resource_type: "auto"' tells Cloudinary to automatically detect the file type (image, video, etc.).
            resource_type: "auto",
        });
        console.log("File has been uploaded successfully on Cloudinary: ", response.url);
        fs.unlinkSync(localFilePath); // Important: Remove the locally saved temporary file on success.
        return response;

    } catch (error) { // This block catches any errors that happened within the 'try' block.
        fs.unlinkSync(localFilePath); // If the upload fails, delete the temporary file from the local server.
        return null; // Return null to clearly indicate that the upload operation failed.
    }
};

export { uploadOnCloudinary };