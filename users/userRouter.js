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

function validateUserId() {
    return (req, res, next) => {
        users
            .getById(req.params.id)
            .then((user) => {
                if (user) {
                    // attach the user to the request object, so we can access it later
                    // without having to access the database again
                    req.user = user;
                    next();
                } else {
                    res.status(400).json({
                        message: "Invalid user id",
                    });
                }
            })
            .catch((error) => {
                console.log("Err: " + error);
            });
    };
}

function validateUser() {
    // do your magic!
    return (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({
                message: "missing required name field",
            });
        }

        next();
    };
}

function validatePost() {
    // do your magic!
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "Missing post data",
            });
        }

        next();
    };
}

module.exports = router;
