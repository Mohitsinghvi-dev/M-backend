// Import necessary modules
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; // Used for creating JSON Web Tokens for authentication
import bcrypt from "bcrypt"; // Used for hashing passwords securely

// Define the schema for the User model
const userSchema = new Schema(
    {
        username: {
            // The user's unique handle
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            // The user's email address, used for login and communication
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            // The user's full name
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            // URL for the user's profile picture, hosted on a service like Cloudinary
            type: String,
            required: true,
        },

        coverImage: {
            // URL for the user's cover image, also hosted on a service like Cloudinary
            type: String,
        },
        watchHistory: [
            {
                // An array to store references to videos the user has watched
                type: Schema.Types.ObjectId,
                ref: "Video" // This creates a reference to the 'Video' model
            }
        ],
        password: {
            // The user's hashed password
            type: String,
            required: [true, 'password is required']

        },
        refreshToken: {
            // A token used to generate new access tokens without requiring the user to log in again
            type: String,
        },



    },
    {
        // Automatically add 'createdAt' and 'updatedAt' fields to the document
        timestamps: true
    }
)

// Mongoose middleware that runs before a document is saved (`.pre("save", ...)`).
// This function is used to hash the user's password before it's stored in the database.
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    // Hash the password using bcrypt with 10 salt rounds. `await` is used because hashing is an async operation.
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Define a custom method on the user schema to check if a provided password is correct.
userSchema.methods.isPasswordCorrect = async function (password) {
    // Use bcrypt's compare function to check the provided password against the stored hashed password.
    // It returns true if they match, false otherwise.
    return await bcrypt.compare(password, this.password)
}

// Define a custom method to generate a short-lived JWT Access Token.
userSchema.methods.generateAccessToken = function () {
    // `jwt.sign` creates a token.
    return jwt.sign(
        {
            // This is the "payload" of the token, containing user data.
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            username: this.username
        },
        // The secret key used to sign the token, stored in environment variables for security.
        process.env.ACCESS_TOKEN_SECRET,
        {
            // Options for the token, like its expiration time.
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

// Define a custom method to generate a long-lived JWT Refresh Token.
userSchema.methods.generateRefreshToken = function () {
    // Refresh tokens typically have a simpler payload, often just the user's ID.
    return jwt.sign(
        {
            _id: this._id,
        },
        // It's best practice to use a different secret for refresh tokens.
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// Create the Mongoose model from the schema.
// The first argument "User" is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name (e.g., "users").
export const User = mongoose.model("User", userSchema)



// A quick note: JWT (JSON Web Token) is a standard for creating access tokens that assert some number of claims.
// When sent in an "Authorization" header, they are typically prefixed with "Bearer ", e.g., "Authorization: Bearer <token>".