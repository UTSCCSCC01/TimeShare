const express = require("express")
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./db/conn')
const dotenv = require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT || 5000


connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/Profiles", require("./routes/profileRoutes"))
app.use("/api/User", require("./routes/userRoutes"))

// custom error handler
app.use(errorHandler)

 
app.listen(port, () => { console.log(`Server is running on port: ${port}`); })