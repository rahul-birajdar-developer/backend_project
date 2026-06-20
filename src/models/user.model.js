import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        avtar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistery: [
            {
                type: Schema.Types.ObjectId,
                ref: "video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password Is Required !!"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

//password bcrypt method when user enter the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

//cheak the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    );
};

//generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    );
};
