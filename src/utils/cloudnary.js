import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOncloudnary = async (filePath) => {
    try {
        if (!filePath) return null;

        console.log("Uploading:", filePath);
        console.log("File exists:", fs.existsSync(filePath));

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        console.log("Upload Success:", response);

        return response;

    } catch (error) {
        console.error("========== CLOUDINARY ERROR ==========");
        console.error("Message:", error.message);
        console.error("HTTP Code:", error.http_code);
        console.error("Name:", error.name);
        console.error(error);
        return null;
    }
};
export { uploadOncloudnary };