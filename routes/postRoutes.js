const { createPost, getPosts, deletePost } = require("../controllers/post");

const router = require("express").Router();

router.post("/create", createPost);
router.get("/", getPosts);
router.delete("/", deletePost);

module.exports = router;
