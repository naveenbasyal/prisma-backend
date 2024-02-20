const jwt = require("jsonwebtoken");

const getToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  console.log("token file", token);
  return token;
};

module.exports = getToken;
