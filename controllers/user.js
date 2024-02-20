const prisma = require("../prisma/index");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("Please fill all the fields.");
  }
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExist) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists." });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    cookieToken(user, res);
  } catch (err) {
    throw new Error(err);
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("email", email);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const iMatch = bcrypt.compareSync(password, user.password);
      if (iMatch) {
        cookieToken(user, res);
      } else {
        res.status(400).json({ success: false, error: "Invalid credentials." });
      }
    } else {
      res.status(400).json({ success: false, error: "User does not exist." });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { registerUser, LoginUser, logoutUser };
