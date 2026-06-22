import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { User } from "../models/user.model.js";
import { uploadOncloudnary } from "../utils/cloudnary.js";
import { ApiResponce } from "../utils/ApiResponceHandling.js";

const userRegister = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    //step 1 : get user details from frontend
    const { userName, fullName, email, password } = req.body;

    //step 2 : validation - not empty
    // cheak if any field return true it show the error
    if (
        [fullName, userName, email.password].some((field) => field?.trim() === "")
    ) {
        throw new ApiErrorHandling(400, "All field are required !!")
    }

    //step 3 : check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ email }, { userName }]
    })

    if (existedUser) {
        throw new ApiErrorHandling(409, "User with email or username already exists !!")
    }

    //step 4 : check for images, check for avatar
    const avatarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    const avatar = await uploadOncloudnary(avatarLocalPath);
    const coverImage = await uploadOncloudnary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiErrorHandling(400, "Avatar file is requred !!")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        userName: userName.toLowerCase(),
        password,
        email,
    })

    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})



export { userRegister }