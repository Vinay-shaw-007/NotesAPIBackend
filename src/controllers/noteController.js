const Note = require("../models/note");

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newNote = await Note.create({
      title,
      description,
      userId: req.userId,
    });

    return res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const readNote = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newNote = {
      title,
      description,
      userId: req.userId,
    };

    await Note.findByIdAndUpdate(id, newNote, { new: true });
    return res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Note.findByIdAndRemove(id);

    return res.status(202).json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createNote,
  readNote,
  updateNote,
  deleteNote,
};
