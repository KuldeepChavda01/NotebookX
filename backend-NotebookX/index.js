const express = require("express");
const connectToMongo = require("./database");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectToMongo();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`NotebookX is listening on ${process.env.PORT}`);
});
