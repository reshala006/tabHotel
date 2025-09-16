import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import roomRoutes from "./routes/roomRoutes" // ← Добавляем импорт

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/rooms", roomRoutes) // ← Добавляем роуты номеров

app.get("/api/health", (req, res) => {
    res.json({ message: "Server is up and running!" })
})

export default app
