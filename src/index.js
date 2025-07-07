// require ("dotenv").config({path:"./env"})

import connectDB from "./db/index.js"

connectDB()





    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!"), err;

    })
































// .then(() => {
//     app.on("error", (error) => {
//         console.error("SERVER ERROR: ", error)
//     })

//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️  Server is running at port : ${process.env.PORT || 8000}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
//     process.exit(1);
// })