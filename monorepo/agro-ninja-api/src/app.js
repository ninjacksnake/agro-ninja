const express = require("express");
const app = express();
const cors = require("cors");
const port = 3004;
const router = require("./routers/appRouter.js");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    const uploadPath = path.join(__dirname, 'uploads');
    if(!fs.existsSync(uploadPath)){
        fs.mkdir(uploadPath)
    }
    cb(null, uploadPath)
  }
})
require("dotenv").config();


app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(router);

app.get("/auth", (req, res) => {
  res.send(authenticationParameters);
});

const server = require("http").createServer(app);

server.listen(port, () => console.log("Server listening port", port));

server.on("error", (err) => {
  console.log("Server error", err);
});
