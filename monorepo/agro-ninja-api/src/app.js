const express = require("express");
const app = express();
const cors = require("cors");
const port = 3004;
const router = require("./routers/appRouter.js");
const bodyParser = require("body-parser");
const getUploadMiddleware = require("./utils/middlewares/uploader.middleware.js");
const { syncDb } = require("./controllers/app.controller");
const bcrypt = require("bcrypt");
const { User } = require("./models/index.js");
const tokenFactory = require('./utils/authHelper/tokenFactory.js');
const uploadProducts = getUploadMiddleware("products");
const uploadChemicals = getUploadMiddleware("chemicals");
const uploadDiceases = getUploadMiddleware("diceases");
const uploadCrops = getUploadMiddleware("crops");

const path = require("path");
const fs = require('fs');
require("dotenv").config();
const executeDbSync = process.env.DBSYNC;


//middlware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(router);
app.use(express.json());

// route to log in and return a token
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email, password },
  });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Credenciales incorrectas." });
  }
  const token = tokenFactory.generateToken(user);
  const refreshToken = tokenFactory.generateRefreshToken(user);
  // save the refresh token to a db 

  res.status(200).cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: 'api/refresh-token',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
    message: "Login successful",
    token: token,
  });
});

app.post("/api/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401);
  try {
    const freshToken = tokenFactory.tokenRefresher(refreshToken);
    res.json({
   //   message: "login successful",
      AccessToken: freshToken,
    })
  } catch (error) {
    res.send(403);
  }
})

app.post('/api/logout',(req, res)=>{
  res.clearCookie('refreshToken', {path:"/api/refresh-token"});
  res.sendStatus(204);
})
app.post("/api/upload/products", uploadProducts.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file Uploaded");
    };
    const fileDetails = {
      name: req.file.originalname,
      size: req.file.size,
    } = req.file;
    res.status(200).json({
      message: "Files uploaded successfully",
      file: fileDetails,
    })
  });

app.post("/api/upload/diseases", uploadDiceases.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file Uploaded");
    };
    const fileDetails = {
      name: req.file.originalname,
      size: req.file.size,
    } = req.file;
    res.status(200).json({
      message: "Files uploaded successfully",
      file: fileDetails,
    })
  });

app.post("/api/upload/chemicals", uploadChemicals.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file Uploaded");
    };
    const fileDetails = {
      name: req.file.originalname,
      size: req.file.size,
    } = req.file;
    res.status(200).json({
      message: "Files uploaded successfully",
      file: fileDetails,
    })
  });

app.get("/api/upload/products/:file", (req, res) => {
  const _module = req.body.module;
  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`, 'products', photoId);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(400).send({ message: "Photo not found" });
  }
});
app.get("/api/upload/diseases/:file", (req, res) => {
  const _module = req.body.module;
  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`, 'diceases', photoId);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(400).send({ message: "Photo not found" });
  }
});

app.get("/api/upload/chemicals/:file", (req, res) => {

  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`, 'chemicals', photoId);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(400).send({ message: "Photo not found" });
  }
});

app.get("/api/upload/crops/:file", (req, res) => {
  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`, 'crops', photoId);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(400).send({ message: "Photo not found" });
  }
});

app.post("/api/upload/crops", uploadCrops.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file Uploaded");
    };
    const fileDetails = {
      name: req.file.originalname,
      size: req.file.size,
    } = req.file;
    res.status(200).json({
      message: "Files uploaded successfully",
      file: fileDetails,
    })
  });

const server = require("http").createServer(app);

server.listen(port, () => {
  if (executeDbSync === "true") {
    syncDb();
    console.log("Database synchronized");
  }
  console.log("Server listening port", port)
});

server.on("error", (err) => {
  console.log("Server error", err);
});
