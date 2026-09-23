import { Router } from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { fetchMeController, loginUserController, logoutUserController, registerUserController, rotateTokensController } from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", registerValidator, registerUserController)

router.post("/login", loginValidator, loginUserController)

router.post("/refresh-token", rotateTokensController)

router.post("/logout", authenticate, logoutUserController)

router.get("/me", authenticate, fetchMeController)




export default router