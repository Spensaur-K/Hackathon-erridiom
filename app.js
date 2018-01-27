const express = require("express");
const body = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(body.json());

app.use(express.static(path.resolve(__dirname, "./dist")));

app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${process.env.PORT}`);
});
