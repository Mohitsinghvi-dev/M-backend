import asyncHandler from "../../utils/asynchandler.js"





const registerUser = asyncHandler((req, res) => {
    res.status(200).json({
        message: "API executed successfully"
    })
})

export { registerUser }