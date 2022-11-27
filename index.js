const express = require("express");
const app = express();
const printerRoute = require("./routes/printers");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/printers", printerRoute);
app.get("/", function (req, res) {
    console.log("Press API loaded");
    res.send("Press API Loaded!");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
})