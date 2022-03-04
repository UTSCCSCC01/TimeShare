const express = require("express")
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./db/conn')
const dotenv = require("dotenv").config({ path: "./config.env" })
const cors = require("cors")
const port = process.env.PORT || 5000
const cors = require("cors")
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
<<<<<<< HEAD
app.use(cors());

=======
app.use(cors())
>>>>>>> 69e0f65793f96eacaf0cc793aa676655f4e7d88f


app.use("/api/Profiles", require("./routes/profileRoutes"))
app.use("/api/User", require("./routes/userRoutes"))
app.use(require("./routes/createTimetable"))
app.use(require("./routes/compareTimetables"))

// custom error handler
app.use(errorHandler)
 
app.listen(port, () => { console.log(`Server is running on port: ${port}`); })