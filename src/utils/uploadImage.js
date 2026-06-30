import imagekit from "./imagekit.js";
import fs from "fs";

const uploadOnImageKit = async (filePath) => {
    try {
        if (!filePath) return null;

        const response = await imagekit.upload({
            file: fs.readFileSync(filePath),
            fileName: Date.now() + ".jpg",
        });

        fs.unlinkSync(filePath);

        return response;
    } catch (error) {
        console.log(error);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return null;
    }
};

export default uploadOnImageKit;