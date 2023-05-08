const { signUp, signIn } = require("../controllers/userController");

const routes = require("express").Router();

routes.post("/signUp", signUp);

routes.post("/signIn", signIn);

module.exports = routes;