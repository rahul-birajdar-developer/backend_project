import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//help to upload file ,image in server
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOncloudnary = async (filePath) => {
    try {
        if (!filePath) return null;

        //upload file on cloudnary

        const responce = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });
        console.log("File uploded successfully !!", responce.url);
        return responce;
    } catch (error) {
        fs.unlinkSync(filePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}