import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import path from "path"
import authRoutes from "./routes/authRoutes"
import roomRoutes from "./routes/roomRoutes"
import uploadRoutes from "./routes/uploadRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import adminRoutes from "./routes/adminRoutes"
import maidRoutes from "./routes/maidRoutes"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
)

// app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/uploads", uploadRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/maid", maidRoutes)

app.get("/api/health", (req, res) => {
    res.json({ message: "Server is up and running!" })
})

export default app
