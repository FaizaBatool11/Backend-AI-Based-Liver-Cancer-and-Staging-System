import express from "express";
import { signup } from "../Controllers/signupController.js";
import { login } from "../Controllers/loginController.js";
import { forgotPassword } from "../Controllers/forgetPsswordController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);  // 👈 controller use kiya

export default router;
