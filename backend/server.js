const express = require("express")
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./db/conn')
const dotenv = require("dotenv").config({ path: "./config.env" })
const cors = require("cors")
const port = process.env.PORT || 5000
const fileUpload = require('express-fileupload')

connectDB()

const app = express()

app.use(fileUpload({
    createParentPath: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/api/Profiles", require("./routes/profileRoutes"))
app.use("/api/User", require("./routes/userRoutes"))
app.use("/api/Timetable", require("./routes/createTimetable"))
app.use("/api/Timetable", require("./routes/compareTimetables"))
app.use("/api/Group", require("./routes/groupRoutes"))
app.use("/static", express.static('static'))

// custom error handler
app.use(errorHandler)
 
app.listen(port, () => { console.log(`Server is running on port: ${port}`); })