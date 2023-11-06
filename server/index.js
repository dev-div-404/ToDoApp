import express from 'express';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'

import connectDB from "./database/connDb.js";
import dotenv from 'dotenv';
import UserModel from './database/models/UserModel.js'
import TaskModel from './database/models/TaskModel.js';
// for session managements

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['https://visionary-bublanina-804dbc.netlify.app','https://to-do-app-by-dibyendu.netlify.app','http://localhost:3000'],
    credentials: true,
    methods :['POST','GET']
  }));

  app.use(cookieParser())
  app.use(bodyParser.json())

    dotenv.config();
    const port = process.env.PORT || 8080;




app.use(
    session({
      secret: 'helloworld',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 *60 * 24,
      },
    })
  );

connectDB();

app.post('/signuprequest',async (req,res)=>{
    let user = await UserModel.findOne({email : req.body.email})
    if(user){
        return res.status(201).json({'message' : 'email already exist'})
    }
    UserModel.create({
        name: req.body.name,
        email:req.body.email,
        passWord:req.body.passcode
    }).then(() => {
        res.status(200).json({ message: 'User created successfully' });
    }).catch(err => console.log(err))
})

app.post('/loginrequest',async (req,res)=>{
    const email = req.body.email;
    const pass = req.body.passcode;
    console.log('trying to log in by a user')
    try{
        const user = await UserModel.findOne({email : email})
        if(! user){
            res.status(201).json({message : 'No User Found'});
        }else if(user.passWord !== pass){
            res.status(201).json({message : 'incorrect password'});
        }else{
            req.session.email = email
            console.log('logged in :: '+ req.session.email);
            res.status(200).json({message : 'logged in successfully',user : req.session.email})
        }
    }catch (err){
        console.log(err)
    }
})

app.get('/getuser', async (req,res) =>{
    // console.log(req.session);
    console.log('trying to get user')
    console.log('session email :: '+req.session.email)
    if(req.session.email)
    {
        const user = await UserModel.findOne({email : req.session.email})
        res.status(200).json({ loggedIn : true,email : req.session.email ,userName : user.name})
    }
    else{
        res.status(200).json({loggedIn : false});
    }
})

app.post('/addtask',async (req,res)=>{

    if(req.session.email){
        TaskModel.create({
            email : req.session.email,
            description : req.body.description,
            date : req.body.date,
            status : false
        }).then(() =>{
            console.log('added one task for user ' + req.session.email)
            res.status(200).json({message : 'one task added successfully'})
        }).catch(err => console.log(err))
    }else{
        res.status(201).json({message : 'session expired. please log in'})
    }

})

app.get('/gettasks',async (req,res)=>{

    if(req.session.email){
        const tasklist = await TaskModel.find({email : req.session.email});
        tasklist.sort((a, b) => new Date(a.date) - new Date(b.date));
        res.status(200).json({tasks : tasklist})
    }else{
        res.status(201).json({message : 'session expired. please log in'})
    }
})


app.post('/deletetask',async (req,res)=>{

    if(req.session.email){
        TaskModel.deleteOne({
            email : req.session.email,
            _id: req.body.taskid
        }).then(() =>{
            console.log('deleted one task for user ' + req.session.email)
            res.status(200).json({message : 'one task deleted successfully'})
        }).catch(err => console.log(err))
    }else{
        res.status(201).json({message : 'session expired. please log in'})
    }
})

app.post('/donetask',async (req,res)=>{

    if(req.session.email){
        TaskModel.findByIdAndUpdate(req.body.taskid,{
            status : true
        }).then(() =>{
            console.log('updated one task for user ' + req.session.email)
            res.status(200).json({message : 'one task updated successfully'})
        }).catch(err => console.log(err))
    }else{
        res.status(201).json({message : 'session expired. please log in'})
    }
})

app.get('/logout',async (req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        res.status(200).json({message : 'logged out successfully'})
        console.log('one user logged out')
      });
})

app.listen(port, () => {
    console.log('server is listining on port '+port);
    console.log('domain :: https://visionary-bublanina-804dbc.netlify.app changed 1')
})