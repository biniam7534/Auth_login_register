import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password });

        return res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password){
            return res 
            ,status(400)
            .json({message: "please fill will the fields"})
        }
        const user = await User.findOne({email});
        if (!user || (!await user.matchpassword(password))){
            return res 
            ,status(401)
            .json({message: "Invalid credentials"})

        }
        res.json({
             id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (err){
        return res.status(500).json({ message: "Server error", error: err.message });

    }
})

export default router;
