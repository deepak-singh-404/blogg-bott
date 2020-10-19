const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv');
const path = require('path')
dotenv.config()

const cors = require('cors')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

//MIDDILWARES
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser())
app.use(cors())

// Routes
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require('./config/passport')(passport)

app.use(morgan('dev'))

//ROUTES
app.use('/api/user', userRoutes)
app.use('/api/blog', blogRoutes)

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res, next) => {
    res.render("./build/index")
})



//Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error);
})

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)
    , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
        app.listen(PORT)
        console.log("server Started")
    }).catch((err) => {
        console.log("Error in connecting to DataBase", err.message)
    })

// process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD
// "mongodb://127.0.0.1:27017/frontEndProject"

