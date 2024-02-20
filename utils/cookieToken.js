const getToken = require("./getToken");

const cookieToken = (user, res) => {
  const token = getToken(user.id);

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3days
    httpOnly: true,
  };
  user.password = undefined;
  
  return res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
