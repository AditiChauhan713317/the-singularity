import express from "express";
import { loginUser, signupUser } from "../controllers/authController";

const router = express.Router();


// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

export default router;