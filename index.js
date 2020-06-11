//This import is pulling from node_modules now
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
const port = process.env.PORT || 4000;

// This is installing some middleware to allow Express
// to parse JSON request bodies. We'll go more into detail about this later.
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/', userRouter);
server.use('/posts'. postRouter);

server.listen(port, () => {
    console.log(`server started on port ${port}`);
});
