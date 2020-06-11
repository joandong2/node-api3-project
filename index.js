//This import is pulling from node_modules now
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

// This is installing some middleware to allow Express
// to parse JSON request bodies. We'll go more into detail about this later.
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(userRouter);
server.use(postRouter);

server.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});
