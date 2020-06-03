const express = require("express");
const posts = require("./postDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  posts
    .get(req.query)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => {
      res
        .status(500)
        .json({ message: "This was an error retrieving the posts." });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
