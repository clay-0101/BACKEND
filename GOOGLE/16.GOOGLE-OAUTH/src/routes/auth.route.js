import express from "express"
import jwt from "jsonwebtoken"
import passport from "../config/passport.js";
import { authenticate } from "../middleware/auth.middleware.js";
import userModel from "../models/user.model.js";



// Steps 1–2: start the flow → Passport redirects to Google

let router = express.Router()
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
        session: false,
    })
);

// Steps 6–15: Google sends the user back with ?code=
router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=google`,
    }),
    (req, res) => {
        // req.user = whatever the verify callback passed to done(null, user)
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.CLIENT_URL}`);
    }
);

router.get('/me', async (req, res) => {
    let {token} = req.cookies

    if (!token) {
        return res.status(401).json({
            message: "token not foud"
        })
    }
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET)

        let user = await userModel.findById(decode.id)

        if (!user) {
            return res.status(401).json({
                message: "user not foud"
            })
        }

        res.status(200).json({
            message: "User fetched",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "erroorr..."
        })
    }


});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

export default router