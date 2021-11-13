import express from "express";
import { signin, signup } from "../controllers/user.js";

//How To Use Middleware :
//import auth from "../middleware/auth.js";
//Do Actions Like This (For Example Like A Post)
//router.post("/", auth, createPost);

const router = express.Router();
//          Routes And Actions
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
