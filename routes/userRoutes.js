const router = require("express").Router();
const { registerUser, LoginUser, logoutUser } = require("../controllers/user");


router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/logout", logoutUser);

module.exports = router;
