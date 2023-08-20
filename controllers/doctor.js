import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // console.log(email);
    // const oldUser = await User.findOne({ email });

    // if (!oldUser) 
    // return res.status(404).json({ message: "User doesn't exist" });

    // const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    // if (!isPasswordCorrect) 
    // return res.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign({ email: oldUser.email, id: oldUser._id },'test', { expiresIn: "1h" });
    
    // const result=oldUser;
    // console.log(tokenn);
    // oldUser["token"]=token;
    // console.log(oldUser);
    res.status(200).json({ result:oldUser,  token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};



export const signup = async (req, res) => {
   
    const {
      email,
      password,
      name,
      phone,
      photo,
      ticketPrice,
      role,
      specialization,
      qualifications,
      experiences,
      bio,
      about,
      timeSlots,
      reviews,
      averageRating,
      workingDays,
      timeSlotsPerDay,
      slotTimings,
      appointments,
    } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await Doctor.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the doctor profile
      const newDoctor = await Doctor.create({
        email,
        password: hashedPassword,
        name,
        phone,
        photo,
        ticketPrice,
        role,
        specialization,
        qualifications,
        experiences,
        bio,
        about,
        timeSlots,
        reviews,
        averageRating,
        workingDays,
        timeSlotsPerDay,
        slotTimings,
        appointments,
      });
  
      res.status(200).json({ message: "Doctor registered successfully", data: newDoctor });
    } catch (error) {
      console.error("Error in signup:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

