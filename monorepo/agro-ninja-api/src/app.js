const express = require("express");
const app = express();
const cors = require("cors");
const port = 3004;
const router = require("./routers/appRouter.js");
const bodyParser = require("body-parser");
require("dotenv").config();
const Imagekit = require("imagekit");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(router);

app.get("/auth", (req, res) => {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.send(authenticationParameters);
});

const server = require("http").createServer(app);

server.listen(port, () => console.log("Server listening port", port));

server.on("error", (err) => {
  console.log("Server error", err);
});
