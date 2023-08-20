import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';
import Appointment from '../models/appointment.js'; 

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

export const addappointment = async (req, res) => {
    const { doctorId, patientId, patientName, appointmentDate, slotTime } = req.body;
  
    try {
      // Find the doctor
      const doctor = await Doctor.findById(doctorId);
  
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      // Create the appointment
      const newAppointment = new Appointment({
        doctor: doctorId,
        patient: patientId,
        patientName,
        appointmentDate: new Date(appointmentDate),
        slot: slotTime,
        tokenNumber: 1,
      });
  
      // Find or create the date entry in doctor's appointmentOrganized
      let dateEntry = doctor.appointmentOrganized.find(
        (dateEntry) => dateEntry.date.getTime() === newAppointment.appointmentDate.getTime()
      );
  
      if (!dateEntry) {
        dateEntry = {
          date: newAppointment.appointmentDate,
          slots: [{ slotTime, appointments: [newAppointment._id] }],
        };
        doctor.appointmentOrganized.push(dateEntry);
      } else {
        // Find or create the slot entry within the date entry
        let slotEntry = dateEntry.slots.find((slot) => slot.slotTime === slotTime);
  
        if (!slotEntry) {
          slotEntry = {
            slotTime,
            appointments: [newAppointment._id],
          };
          dateEntry.slots.push(slotEntry);
        } else {
          slotEntry.appointments.push(newAppointment._id);
        }
        console.log(slotEntry.appointments.length)
  if(slotEntry.appointments.length===1)
    {    newAppointment.tokenNumber = slotEntry.appointments.length+1;
    }
    else{
        newAppointment.tokenNumber = slotEntry.appointments.length;
    }
      }
  
      await newAppointment.save();
      await doctor.save();
  
      res.status(200).json({ result: newAppointment });
    } catch (error)
    {

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
      avgTimePerPatient,
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
        avgTimePerPatient,
        slotTimings,
        appointments,
      });
  
      res.status(200).json({ message: "Doctor registered successfully", data: newDoctor });
    } catch (error) {
      console.error("Error in signup:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

