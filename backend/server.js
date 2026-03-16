import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import router from "./routes/generalRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch"; // ensure node-fetch installed

dotenv.config();

/* ================= PATH ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");

/* ================= EXPRESS ================= */
const app = express();
app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware & routes
app.use(authMiddleware);
app.use("/", router);

/* ================= HTTP + SOCKET.IO ================= */
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

/* ================= AI & Tools ================= */
const History = [];
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); // Primary AI

async function sum({ num1, num2 }) {
    return num1 + num2;
}
async function prime({ num }) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
    return true;
}
async function getCryptoPrice({ coin }) {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`
    );
    const data = await response.json();
    return data;
}
async function getFactorial({ num }) {
    if (num < 0) return "Factorial not defined for negative numbers";
    let result = 1;
    for (let i = 1; i <= num; i++) result *= i;
    return result;
}

const availableTools = { sum, prime, getCryptoPrice, getFactorial };

// Function declarations for AI model
const sumDeclaration = {
    name: "sum",
    description: "Get the sum of 2 numbers",
    parameters: { type: "OBJECT", properties: { num1: { type: "NUMBER" }, num2: { type: "NUMBER" } }, required: ["num1", "num2"] },
};
const primeDeclaration = { name: "prime", description: "Check if number is prime", parameters: { type: "OBJECT", properties: { num: { type: "NUMBER" } }, required: ["num"] } };
const cryptoDeclaration = { name: "getCryptoPrice", description: "Get crypto price like bitcoin", parameters: { type: "OBJECT", properties: { coin: { type: "STRING" } }, required: ["coin"] } };
const factorialDeclaration = { name: "getFactorial", description: "Get factorial of a number", parameters: { type: "OBJECT", properties: { num: { type: "NUMBER" } }, required: ["num"] } };

// ================= Run Primary AI Agent =================
async function runAgent(userMessage) {
    History.push({ role: "user", parts: [{ text: userMessage }] });

    while (true) {
        const response = await ai.models.generateContent({
            model: process.env.MODEL,
            contents: History,
            config: {
                systemInstruction: `You are an AI Agent. You can use sum, prime, getCryptoPrice, getFactorial tools when needed.`,
                tools: [{ functionDeclarations: [sumDeclaration, primeDeclaration, cryptoDeclaration, factorialDeclaration] }],
            },
        });

        if (response.functionCalls && response.functionCalls.length > 0) {
            const { name, args } = response.functionCalls[0];
            const funCall = availableTools[name];
            const result = await funCall(args);

            History.push({ role: "model", parts: [{ functionCall: response.functionCalls[0] }] });
            History.push({ role: "user", parts: [{ functionResponse: { name, response: { result } } }] });
        } else {
            History.push({ role: "model", parts: [{ text: response.text }] });
            return response.text;
        }
    }
}


// ================= Secondary AI Agent =================
const chatdata = {}; // Store chat per user
const INITIAL_SYSTEM_INSTRUCTION = `
You are a 'TechQv AI' developed by 'Dinesh verma'

1.Human-Like Responses
 ->Always respond naturally and conversationally.
 ->Avoid robotic or acknowledgment-only replies (e.g., don’t just say “Hello acknowledged”).
 ->Engage with the user as a friendly human would.
2.Greetings
->When the user says “Hello” or similar, reply with a warm, human-like greeting:
   i. Example: “Hi there! How’s it going?”
   ii. Do not give one-word or mechanical responses.
3.Context & Relevance
-> Consider the conversation context before replying.
-> Give meaningful, helpful, or interesting responses rather than generic statements.
4.Content Formatting
-> For code, use <pre><code> or markdown blocks and escape HTML characters.
-> Use paragraphs, lists, or headings to make text readable.
5.Istruction Handling
-> Execute user instructions promptly and directly.
-> Avoid unnecessary confirmations; respond like a competent human assistant.
6.Tone
-> Be friendly, polite, and slightly casual when appropriate.
-> Add light humor or empathy when it fits the conversation.
`;

// Create GoogleGenAI instance
const llm = new GoogleGenAI({ apiKey: process.env.API_KEY });
const llmModelName = process.env.MODEL2;

async function runllmAgent(userMessage, phoneNumber = "default") {
    // Initialize chat history for this user
    if (!chatdata[phoneNumber]) chatdata[phoneNumber] = [];

    // Add user message to history
    chatdata[phoneNumber].push({ role: "user", content: userMessage });

    // Convert history into correct GoogleGenAI contents format
    const contents = [
        { parts: [{ text: INITIAL_SYSTEM_INSTRUCTION }] }, // system instruction
        ...chatdata[phoneNumber].map((msg) => ({
            parts: [{ text: msg.content }],
        })),
    ];

    // Generate AI response
    const res = await llm.models.generateContent({
        model: llmModelName,
        contents,
        config: {
            maxOutputTokens: 1024,
            temperature: 0.3, // low temp = strict answers
        },
    });

    // Trim response text
    const replyText = res.text.trim();

    // Save AI response to history
    chatdata[phoneNumber].push({ role: "assistant", content: replyText });

    return replyText;
}

export { runllmAgent };

/* ================= SOCKET.IO ================= */
let llmModelToggle = false;

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("messageFromClient", async (msg) => {
        if (!msg?.trim()) return socket.emit("messageFromServer", "Please type something 😅");

        try {
            let reply = "No response get from model";
            if (llmModelToggle) {
                reply = await runAgent(msg); // Primary AI
            } else {
                reply = await runllmAgent(msg, 1234567890); // Secondary AI
            }
            socket.emit("messageFromServer", reply);
        } catch (err) {
            console.error(err);
            socket.emit("messageFromServer", "Server is taking a nap 😴 !! now I switch your current model !! let's ask any questions !!");
            socket.emit("servertriggerToChangeModel",{info:"quota exceeded"});

        }
    });

    socket.on("changeModel", (data, ack) => {
        llmModelToggle = !llmModelToggle;
        console.log(`Model toggled. Now using: ${llmModelToggle ? "Primary AI" : "Secondary AI"}`);
        ack("success");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

/* ================= START SERVER ================= */
connectDB()
    .then(() => {
        httpServer.listen(process.env.PORT, () =>
            console.log(`TechQvAi running at http://localhost:${process.env.PORT}`)
        );
    })
    .catch((err) => console.log("DB connection failed. Server not started:", err.message));