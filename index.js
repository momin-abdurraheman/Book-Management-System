const { response } = require("express");
const express = require("express")

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is uptodate and running perfectly"
    });
});

app.get("*", (req, res) => {
    response.status(404).json({
        message: "This route does not exist"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})