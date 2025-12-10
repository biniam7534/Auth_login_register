import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    },


}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.method.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", UserSchem);
export default User;

