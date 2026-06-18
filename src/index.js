// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/server.js";

dotenv.config({
    path: "./env"
})

connectDB();














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