const express = require("express");
const router = express.Router();
const db = require("./userDb.js");
const postDb = require("../posts/postDb.js");

// middleware functions
router.use(express.json());
// POSTs
// router.post("/", validatePost, (req, res) => {
//   // do your magic!
//   const post = req.body;
// });

router.post("/", (req, res) => {
  db.insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "Couldnt post user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  postDb
    .insert(postInfo)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "error creating post" });
    });
});

// GETs
router.get("/", (req, res) => {
  db.get(req.query)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "This was an error retrieving the posts." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.e);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  const { id } = req.params;
  db.getUserPosts(id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ errorMessage: "your post wasn't found." });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((e) => {
      res.status(204).json(e);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "couldnt delete user by id" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  db.update(req.params.id, req.body)
    .then((e) => {
      res
        .status(200)
        .json({ message: "User updated", id: e, newInfo: req.body });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "couldnt update user" });
    });
});
// custom middleware
function validateUserId(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then((e) => {
      if (e) {
        req.e = e;
        next();
      } else {
        res.status(400).json({ errorMessage: "That ID does not exist!" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the db.",
      });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "missing body" });
  } else if (!req.body.name) {
    res.status(400).json({ errorMessage: "missing name" });
  } else {
    next();
  }
  // if (req.body) {
  //   if (req.body.name) {
  //     next();
  //   } else {
  //     res.status(400).json({ message: "Missing name" });
  //   }
  // } else {
  //   res.status(400).json({ message: "Missing user data" });
  // }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ errorMessage: "Missing req text field" });
  } else {
    next();
  }

  // if (req.body) {
  //   if (req.body.name) {
  //     next();
  //   } else if (!req.body.name) {
  //     res.status(400).json({ message: "missing required text field" });
  //   } else if (!req.body) {
  //     res.status(400).json({ message: "missing post data" });
  //   }
  // }
}

module.exports = router;
