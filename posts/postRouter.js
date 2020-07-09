const express = require("express");
const db = require("./postDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => {
      res
        .status(500)
        .json({ message: "There was a problem accessing the posts." });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The post could not be retrieved." });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "There was an error deleting the post." });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const body = req.body;
  db.update(id, body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "There was an error updating the post." });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Invalid post id." });
      } else {
        req.post = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "There was an error." });
    });
}

module.exports = router;
