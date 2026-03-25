require("dotenv").config()

const express = require("express")
const cors = require("cors");
const connectToMongo = require("./config/database")

const app = express();
const port = process.env.PORT

connectToMongo()

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth_routes.js"));
app.use("/api/note", require("./routes/note_routes.js"));

app.listen(port, () => {
    console.log(`NotebookX's server listening on port: ${port}`)
})



