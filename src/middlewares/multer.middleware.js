// Import the multer library, which is a middleware for handling multipart/form-data, primarily used for uploading files.
import multer from "multer";

// Configure the storage engine for multer. Here, we're using diskStorage,
// which gives us control over storing files on the server's disk.
const storage = multer.diskStorage({
    // The 'destination' function tells multer where to save the uploaded files.
    destination: function (req, file, cb) {
        // The callback 'cb' is called with a null error and the destination folder path.
        // Using a relative path is recommended for portability.
        // IMPORTANT: Make sure the "./public/temp" directory exists in your project root.
        cb(null, "./public/temp");
    },
    // The 'filename' function determines the name of the file inside the destination folder.
    filename: function (req, file, cb) {
        // The original code had a bug with an undefined 'uniqueSuffix' variable.
        // Since this file is stored temporarily before being sent to Cloudinary,
        // using the original filename is a simple and effective approach. Cloudinary will handle creating a unique URL.
        cb(null, file.originalname);
    },
});

// Create the multer middleware by passing the storage configuration.
// This 'upload' object can now be used in your routes to handle file uploads.
export const upload = multer({ storage });
 