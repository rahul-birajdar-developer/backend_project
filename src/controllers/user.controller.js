import asyncHandler from "../utils/asyncHandler.js";


const userRegister = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "server run successfully"
    })
})

export { userRegister }