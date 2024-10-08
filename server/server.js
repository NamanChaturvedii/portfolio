import express from "express"
const app = express();
import authRoutes from "./routes/auth.js"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./db/conne.js"
import cors from "cors"
connectDB();



const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())
app.use("/api/v1/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is running on port 5000")
}   )