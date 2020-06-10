const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser(), (req, res) => {
    // do your magic!
    users
        .insert(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((error) => {
            console.log("Err: " + error);
        });
});

router.post("/:id/posts", validatePost(), validateUserId(), (req, res) => {
    // do your magic!
    posts
        .insert({
            user_id: req.params.id,
            text: req.body.text,
        })
        .then((post) => {
            res.json(post);
        })
        .catch((error) => {
            console.log("Err: " + error);
        });
});

router.get("/", (req, res) => {
    // do your magic!
    users.get().then((users) => {
        res.status(200).json(users);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
    // do your magic!
    res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
    // do your magic!
    users
        .getUserPosts(req.params.id)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.log("Err: " + error);
        });
});

router.delete("/:id", validateUserId(), (req, res) => {
    // do your magic!
    users
        .remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "The user has been removed",
            });
        })
        .catch((error) => {
            console.log("Err: " + error);
        });
});

router.put("/:id", validateUserId(), validateUser(), (req, res) => {
    // do your magic!
    users
        .update(req.params.id, req.body)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            console.log("Err: " + error);
        });
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
