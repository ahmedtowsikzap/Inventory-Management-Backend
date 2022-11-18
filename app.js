const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
// middlewares
app.use(express.json());
app.use(cors());

//routes

const productRoute = require('./route/product.route')


// posting to database

app.use('/api/v1/product', productRoute)

app.get("/api/v1/product",)

module.exports = app;
