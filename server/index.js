require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport")
require("./passport")
const router = require("./routes/index")


const PORT  = process.env.PORT || 5000;
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set Content-Security-Policy header
app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; img-src 'self' data:"
    );
    next();
  });
//session middleware
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        maxAge: 60 * 60 * 1000
    },
}))

//passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        allowedHeaders: "Content-Type,Authorization", // Add necessary headers
    })
);

app.use("/api", router)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(PORT, () => {
            console.log(`server started at port ${PORT}`)
        })
        
    } catch (error) {
        console.error("DB connection error: " , error)
    }
}

start()