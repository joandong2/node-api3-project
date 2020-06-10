const express = require("express");
const users = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {
    // do your magic!
});

router.post("/:id/posts", (req, res) => {
    // do your magic!
});

router.get("/", (req, res) => {
    // do your magic!
    users.get().then((users) => {
        res.json(users);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
    // do your magic!
    res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
    // do your magic!
});

router.delete("/:id", (req, res) => {
    // do your magic!
});

router.put("/:id", (req, res) => {
    // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
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
                    res.status(404).json({
                        message: "User not found",
                    });
                }
            })
            .catch(next);
    };
}

function validateUser(req, res, next) {
    // do your magic!
}

function validatePost(req, res, next) {
    // do your magic!
}

module.exports = router;
