const express = require("express");
const users = require("./userDb.js");
const router = express.Router();

// middleware functions
const validateId = (req, res, next) => {
  const { id } = req.params;
  users
    .getById(id)
    .then((e) => {
      if (e) {
        req.e = e;
        next();
      } else {
        res.status(500).json({ errorMessage: "That ID does not exist!" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the db.",
      });
    });
};

// POSTs
router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

// GETs
router.get("/", (req, res) => {
  // do your magic!
  users
    .get(req.query)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "This was an error retrieving the posts." });
    });
});

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.e);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const { userId } = req.params;

  users
    .getById(id)
    .getUserPosts(userId)
    .then((e) => {
      res.status(200).json(e);
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware
function validateUserId(req, res, next) {
  // do your magic!
}
function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
