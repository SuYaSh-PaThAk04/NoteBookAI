import express from "express"
import { checkAuth, loginUser,  registerUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router=express.Router()

router.post("/register",registerUser);

router.post("/login",loginUser)



router.get("/checkAuth",authMiddleware,checkAuth);

export default router