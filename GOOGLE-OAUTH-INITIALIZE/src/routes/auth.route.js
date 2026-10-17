import express from "express"
import passport from "passport"

let router = express.Router()

router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: 'select_account',
        session: false
    })
)

router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:3000/"
    }),
    (req, res) => {
        try {
            res.status(200).json({user : req.user})
        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    }
)

export default router