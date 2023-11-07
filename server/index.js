require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser')

// connect to DB
const connectDB = require('./db/connect')

// middlewares
const errorHandlerMiddleware = require('./middlewares/errorHandler')
const notFoundMiddleware = require('./middlewares/notFound')
const authMiddleware = require('./middlewares/authMiddleware')


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cors({
    origin: process.env.PROD_URL || "http://localhost:5173"
}))
app.use(express.json())
app.use(helmet())
app.use(cookieParser())

// routes
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const allJobsRouter = require('./routes/allJobs')


app.get('/', authMiddleware, (req, res) => {
    res.status(200).json({title: "jobs lelo api", user: req.user})
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleware, jobsRouter)
app.use('/api/v1/jobs/alljobs', allJobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// connecting to DB

const start = async () => {
    await connectDB(process.env.MONGO_URI)
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err))
    app.listen(PORT, () => console.log(`server is listening to http://localhost:${PORT}`))
}

start()




