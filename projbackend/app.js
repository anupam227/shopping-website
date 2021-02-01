require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

const app = express();

mongoose.connect("mongodb+srv://Anupam227:Anupam27@cluster0.yj5dr.mongodb.net/shopping?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}).
then(()=>{
    console.log("DB is connected")
});
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//My routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",paymentBRoutes);


const port = 8000;
app.listen(port, ()=>{
    console.log(`App is runing at ${port}`)
});