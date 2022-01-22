// require("dotenv").config();
const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const volleyball = require("volleyball");

const app = express();

app.use(volleyball);

app.use("/", serveStatic(path.join(__dirname, "/dist")));
const port = process.env.PORT || 3000;

app.listen(port);

console.log(`listen on port ${port}`);
