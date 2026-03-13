import express from "express";
import {Home} from "../controllers/generalControllers.js"
const router = express.Router();


// routers
router.get("/",Home);


// /export roter here
export default router;