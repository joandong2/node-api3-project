//This import is pulling from node_modules now
const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const cors = require("cors");
const server = express();

// This is installing some middleware to allow Express
// to parse JSON request bodies. We'll go more into detail about this later.
server.use(express.json());
const port = process.env.PORT || 4000
server.use(cors());

server.use(userRouter);
server.use(postRouter);

server.listen(port, () => {
    console.log("server started on port 8080");
});
