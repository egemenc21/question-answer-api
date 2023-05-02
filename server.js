const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");

// Enviroment variables
dotenv.config({
  path: "./config/env/config.env",
});

//MongoDb Connection
connectDatabase();

const app = express();

// Express - Body Middleware --I had to use this for 'req.body' code to work
app.use(express.json());

const PORT = process.env.PORT;

// Routers middleware
app.use("/api", routers);

// Error Handler
app.use(customErrorHandler);

//Static Files
app.use(express.static(path.join(__dirname,"public")))


app.listen(PORT, () => {
  console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});
