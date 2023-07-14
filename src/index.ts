import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router"
import openRoute from "./router/openRoutes"
import { authentication } from "./middleware/authentication"
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express();

const port = 5500;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",openRoute)
app.use(authentication)
app.use("/user", router);

const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect("mongodb+srv://ganeshgogate:qwerty123@blogsdata.zxw3ik7.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

server.listen(port, () => {
  console.log("server listening on port " + port);
});
