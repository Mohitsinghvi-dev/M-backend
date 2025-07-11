/**
 * A higher-order function that wraps an asynchronous Express route handler.
 * Its purpose is to catch any errors that occur within the async handler
 * and pass them to Express's central error-handling middleware using `next()`.
 * This avoids the need for repetitive try-catch blocks in every controller.
 *
 * @param {Function} requestHandler - The asynchronous controller function to execute.
 * It receives (req, res, next) as arguments from Express.
 * @returns {Function} An Express middleware function that executes the requestHandler
 * and catches any potential errors.
 */
const asyncHandler = (requestHandler) => {
    // This returned function is what Express will actually call for the route.
    // It has the standard (req, res, next) signature.
    return (req, res, next) => {
        // `Promise.resolve()` wraps the execution of the original `requestHandler`.
        // This is a robust way to handle it because if `requestHandler` is an async function,
        // it already returns a promise. If it's a synchronous function, `Promise.resolve()`
        // wraps its return value in a resolved promise.
        Promise.resolve(requestHandler(req, res, next))
            // If the promise is rejected (meaning an error was thrown in the async function),
            // the `.catch()` block will be executed.
            .catch((err) => next(err))
    }

}

export default asyncHandler

// --- Below are alternative ways to write the same utility ---
// const asynchandler = () => { }
// const asynchandler = (func) => () => { }
// const asynchandler = (func) => async () => {}


// This is a popular alternative implementation using a try-catch block within an async function.
// It achieves the same goal but can be more intuitive for developers who prefer async/await syntax.
// const asynchandler = (fn) => async (req, res, next) => {
//     try {
//         // We `await` the execution of the provided route handler.
//         await fn(req, res, next)
//     } catch (error) {
//         // If an error is thrown during the execution of `fn`, the catch block will execute.
//         // Note: This approach handles the response directly, unlike the promise-based one
//         // which passes the error to a central error-handling middleware via `next(error)`.
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
