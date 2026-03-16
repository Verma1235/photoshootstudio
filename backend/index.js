import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import router from "./routes/generalRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();

// ------------------------ Express app setup ------------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow CORS only from your frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// external middleware
app.use(authMiddleware);

// routers
app.use("/", router);

// ------------------------ Create HTTP server + Socket.IO ------------------------
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("messageFromClient", (data) => {
    console.log("Message from client:", data);
    socket.broadcast.emit("messageFromServer", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ------------------------ Connect DB & start server ------------------------
connectDB()
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`SERVER RUN AT http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      `Database connection failed! Server not started. Error: ${error.message}`
    );
  });