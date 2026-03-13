// imports all dependancies ---------------- start -----------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"
import router from "./routes/generalRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

// imports all dependancies ---------------- end --------------------

dotenv.config();


// include middlewares ------------------------ start----------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// external middlewares
app.use(authMiddleware);
// include middlewares ------------------------ end------------------


// routers----------------------- start ------------------------------
app.use("/", router);
// routers----------------------- end ------------------------------


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`SERVER RUN AT http://localhost:${process.env.PORT}`);

    })
}).catch((error) => {
    console.log(`database connection die !! i.e. server not started`);
})




