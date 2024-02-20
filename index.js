const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT | 8001;
const verifyToken = require("./middlewares/verifyToken");
// routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/posts", verifyToken, postRoutes);

// app.use("/", (req, res) => {
//   res.send("Hello from prisma");
// });
app.listen(port, () => {
  console.log(`Running on port http://localhost:${port}`);
});
