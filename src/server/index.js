require("dotenv").config();
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const aylien = require("aylien_textapi");
const config = require("../../webpack.dev");
const cors = require('cors');

const compiler = webpack(config);

const isDevEnvironment = process.env.NODE_ENV == "development";

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

if (isDevEnvironment) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

if (!isDevEnvironment) app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.post("/nlpAnalysis", (req, res) => {
  const { url } = req.body;

  textapi.sentiment({ url }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
});