const prisma = require("../prisma/index");

const createPost = async (req, res) => {
  const { title, body, slug } = req.body;
  const authorId = req.user.id;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        body,
        author: { connect: { id: authorId } },
      },
    });

    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
const getPosts = async (req, res) => {
  const authorId = req.user.id;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
      },
    });
    
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
const deletePost = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  getPosts,
};
