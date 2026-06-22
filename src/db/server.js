import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "../constant.js";

const app = express();

const connectDB = async () => {
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGOODB_URL}/${DB_NAME}`)

        console.log(`MongoDB connected !! DB host On ${connectionInstant.connection.host}`)
    } catch (error) {
        console.log("ERROR : ", error)
        process.exit(1)
    }
}

export default connectDB;