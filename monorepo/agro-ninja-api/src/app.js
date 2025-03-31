const express = require("express");
const app = express();
const cors = require("cors");
const port = 3004;
const router = require("./routers/appRouter.js");
const bodyParser = require("body-parser");
const getUploadMiddleware = require("./utils/services/uploader.middleware.js");


const uploadProducts = getUploadMiddleware("products");
const uploadChemicals = getUploadMiddleware("chemicals");
const uploadDiceases = getUploadMiddleware("diceases");
const uploadCrops = getUploadMiddleware("crops");

const path = require("path");
const fs = require('fs');
require("dotenv").config();



//middlware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(router);
app.use(express.json());



app.get("/auth", (req, res) => {
  res.send(authenticationParameters);
});

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


app.get("/api/upload/products/:file", (req, res)=>{
  const _module = req.body.module;
  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`, 'products', photoId);
  if(fs.existsSync(filePath)){
    res.sendFile(filePath);
  }else{
    res.status(400).send({message:"Photo not found"});
  }
});
app.get("/api/upload/diseases/:file", (req, res)=>{
  const _module = req.body.module;
  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`, 'diceases', photoId);
  if(fs.existsSync(filePath)){
    res.sendFile(filePath);
  }else{
    res.status(400).send({message:"Photo not found"});
  }
});

app.get("/api/upload/chemicals/:file", (req, res)=>{

  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`,'chemicals', photoId);
  if(fs.existsSync(filePath)){
    res.sendFile(filePath);
  }else{
    res.status(400).send({message:"Photo not found"});
  }
});

app.get("/api/upload/crops/:file", (req, res)=>{
  const photoId = req.params.file;
  const filePath = path.join(__dirname, `uploads`,'crops', photoId);
  if(fs.existsSync(filePath)){
    res.sendFile(filePath);
  }else{
    res.status(400).send({message:"Photo not found"});
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

server.listen(port, () => console.log("Server listening port", port));

server.on("error", (err) => {
  console.log("Server error", err);
});
