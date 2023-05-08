const {
  readNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const requireUser = require("../middlewares/requireUser");
const routes = require("express").Router();

routes.post("/", requireUser, createNote);

routes.get("/", requireUser, readNote);

routes.put("/:id", requireUser, updateNote);

routes.delete("/:id", requireUser, deleteNote);

module.exports = routes;
