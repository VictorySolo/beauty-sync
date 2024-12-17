require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');
const adminRoutes = require('./routes/adminRoute.js');
const userRoutes = require('./routes/userRoute.js');
const specialistRoutes = require('./routes/specialistRoute.js');
const connectCloudinary = require('./config/cloudinary.js')

// app config
const app = express()
const PORT = process.env.PORT || 3001
connectCloudinary()

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.static("./frontend"))
app.use(cors({
    origin: "*",
    credentials: true,
})
)
app.use(cors());
app.use(helmet())
app.use(session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: false, // Ensure session is not saved until modified
        cookie: {
            httpOnly: true,
            secure: false, // Set process.env.NODE_ENV === "production"
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
    })
)

// api endpoint
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/specialists', specialistRoutes)
//http://localhost:3000/api/admin/add-specialist


app.get('/', (req,res)=>{
    res.send('Server running')
})

const { errorLogger } = require("./services/errorHandler.js");
const { connectDB } = require('./config/db.js');
app.use(errorLogger)


const startServer = async () => {
    try {
        const dbConnected = await connectDB() // Check DB connection
        if (dbConnected) {
            //  setting up PORT
            const PORT = process.env.PORT || 3001

            //  starting server listener on PORT
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`)

            })
        } else {
            console.log("Can't start the app because the DB is unavailable")
        }
    } catch (err) {
        console.error("Error starting server:", err.message);
    }
}



startServer()
