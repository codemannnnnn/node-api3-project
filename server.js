const express = require("express");
const morgan = require("morgan");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

//global middleware
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

// test get request
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
