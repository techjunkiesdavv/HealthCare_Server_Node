import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';
import Appointment from '../models/appointment.js'; 
import HealthInfo from '../models/healthinfo.js'


export const addHealth=async(req,res)=>{
    const {title,description,image,name,email,subheadings}=req.body;
  
    try {
        console.log(title);
        // Create a new HealthInfo document using the provided data
        const newHealthInfo = new HealthInfo({title,description,image,name,email,subheadings});
    
        // Save the document to the database
        const savedHealthInfo = await newHealthInfo.save();
    
        res.status(200).json({savedHealthInfo});
      } catch (error) {
        // Handle any errors (e.g., validation errors)
        console.error('Error while adding health information:', error);
        throw error;
      }
}
