const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.json({ message: "You are not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    if (decoded.userId) {
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });
    } else {
      return res.send({ message: "Token Expired" });
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = verifyToken;
