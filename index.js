require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Note = require('./models/Note');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI).then(function () {
    app.get("/", function (req, res) {
        const response = { statuscode: res.statusCode, message: "API Works!" };
        res.json(response);
    });

    const noteRouter = require('./routes/note');
    app.use("/notes", noteRouter);
});

// Starting the server on a PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server started at PORT: " + PORT);
});