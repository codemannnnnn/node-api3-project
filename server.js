const express = require("express");
const server = express();
const morgan = require("morgan");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

//global middleware
server.use(express.json());
server.use(morgan("dev"));
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

// test get request
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()}${req.method}${req.url}${req.get("Origin")}`
  );
  next();
}

module.exports = server;
