const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET_KEY = "NOTESAPI";

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res
      .status(401)
      .json({ message: "Authorization header is required." });
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const decode = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decode.id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    next();
  } catch (e) {
    console.log(error);
    return res.status(401).json({ message: "Invalid access key." });
  }
};
