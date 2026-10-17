import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("1️⃣ GOOGLE PROFILE:", JSON.stringify(profile, null, 2));

                let user = await userModel.findOne({ googleId: profile.id });
                if (user) return done(null, user);

                user = await userModel.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    avatar: profile.photos?.[0]?.value,
                });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;