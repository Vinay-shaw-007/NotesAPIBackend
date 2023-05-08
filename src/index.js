const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
const dbConnect = require("./dbConnect");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("OK from Server");
});

const PORT = process.env.PORT || 5000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port no. ${PORT}`);
});

//mongodb+srv://Vinay:<password>@cluster0.pfvvbsx.mongodb.net/?retryWrites=true&w=majority
