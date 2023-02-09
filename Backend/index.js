const express = require("express");
const cors = require("cors");
const multer = require("multer");
//const MongoClient = require("mongodb");
const mongoose = require("mongoose");
const socket = require("socket.io");
const bodyParser = require('body-parser');
mongoose.set('strictQuery', true);
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
const imageRoutes = require("./routes/imageRoutes");

const {
    GridFsStorage
  } = require("multer-gridfs-storage");


const app = express();
require("dotenv").config({path: "./.env"});

app.use(bodyParser.json({limit: '16mb', extended: true}));  
app.use(bodyParser.urlencoded({limit: '16mb', extended: true})) 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
  }));
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/image",imageRoutes);

mongoose.connect("mongodb://Dinuroop:24681357@ac-vjyup9x-shard-00-00.dvdnnwz.mongodb.net:27017,ac-vjyup9x-shard-00-01.dvdnnwz.mongodb.net:27017,ac-vjyup9x-shard-00-02.dvdnnwz.mongodb.net:27017/?ssl=true&replicaSet=atlas-jf6fkx-shard-0&authSource=admin&retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port ${process.env.PORT}`);
});

let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
  console.log(bucket);
});

var io = socket(server,{
    cors:{
        origin:"*",
        credentials:true,
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve",data.msg);
        }
    });
});


// mongodb://127.0.0.1:27017/