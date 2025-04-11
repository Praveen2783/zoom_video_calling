import express from 'express';
import {createServer} from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { connectToSocket } from './controllers/socketManger.js';
import cors from 'cors';
import  userRoutes from './routes/usersRoutes.js';






const app = express();
const server = createServer(app);
const io= connectToSocket(server);


app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);


app.get("/home",(req,res)=>{
    res.send("Welcome to home page");
})

const start = async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://praveensingh2783:Praveen2783@videocallcluster.6kcvl.mongodb.net/?retryWrites=true&w=majority&appName=videoCallCluster");
    console.log(` MONGO Connected  database host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("Server is running on port 8000");
    });
}
start();