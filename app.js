import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';


const app = express();
dotenv.config();
app.use(bodyParser.json({limit: '30mb',extended:true}));
// PORT=5000
// CONNECTION_URL=mongodb+srv://utsav2929:utsav2929@cluster0.agsr6z5.mongodb.net/?retryWrites=true&w=majority
app.use(bodyParser.urlencoded({limit: '30mb',extended:true}));
app.use(cors());
app.use('/doctor',doctorRoutes);

app.use('/patient',patientRoutes);


const PORT =process.env.PORT;
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})




mongoose.connection.on('error',err=>{
    console.log('connection failed');
  });
  
  mongoose.connection.on('connected',()=>{
    console.log('connected successfully with database');
  });
  
  app.get('*',(req,res)=>{
      res.status(200).json({
        message:'bad request'
      })
    })
   export default app;



// mongoose.set('useFindAndModify', false); 
