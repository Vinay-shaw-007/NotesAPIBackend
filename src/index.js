const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
const dbConnect = require("./dbConnect");

app.use(express.json());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("OK from Server");
});

dbConnect();

app.listen(5000, () => {
  console.log("Server running on port no. 5000");
});

//mongodb+srv://Vinay:<password>@cluster0.pfvvbsx.mongodb.net/?retryWrites=true&w=majority
