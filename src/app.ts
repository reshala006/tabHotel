import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import path from "path"
import authRoutes from "./routes/authRoutes"
import roomRoutes from "./routes/roomRoutes"
import uploadRoutes from "./routes/uploadRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import adminRoutes from "./routes/adminRoutes"

dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

// Serving static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/uploads", uploadRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/admin", adminRoutes)

app.get("/api/health", (req, res) => {
    res.json({ message: "Server is up and running!" })
})

export default app
