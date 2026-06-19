// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/server.js";
import app from "./app.js";

dotenv.config({
    path: "./env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server listening on port : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("Mongo db connectio failed !!! ", error)
    })













// import { DB_NAME } from "./constant";

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGOOES_URL}/${DB_NAME}`)

//         app.on("error", (error) => {
//             console.log("ERROR : ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App Is Listening On Port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.log("ERROR : ", error)
//         throw error

//     }
// })()