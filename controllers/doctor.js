import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';
import Appointment from '../models/appointment.js'; 


import nodemailer from 'nodemailer';

const secret = 'test';


export const addappointment = async (req, res) => {
    const { doctorId, patientId, patientEmail, appointmentDate, slotTime } = req.body;
  
    try {
      // Find the doctor
      const doctor = await Doctor.findById(doctorId);
  
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      const patient = await Patient.findById(patientId);

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
  
      const newAppointment = new Appointment({
        doctor: doctorId,
        patient: patientId,
        patientEmail,
        appointmentDate: new Date(appointmentDate),
        slot: slotTime,
        tokenNumber: 1,
      });
      patient.bookedAppointments.push(newAppointment._id);

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
      await patient.save();
  
      res.status(200).json({ result: newAppointment });
    } catch (error)
    {

    }
};  



export const getDoctor = async (req, res) => {
  const {searchQuery}=req.body
 
  try {
    // Fetch all doctors from the database
    if(searchQuery===''){
    const doctors = await Doctor.find();
    res.json(doctors);}
    else{
      const regexPattern = new RegExp(searchQuery, 'i'); // 'i' flag for case-insensitive search

      // Use the $or operator to search multiple fields with regex
      const doctors = await Doctor.find({
        $or: [
          { name: { $regex: regexPattern } },
          { email: { $regex: regexPattern } },
          { role: { $regex: regexPattern } },
          { specialization: { $regex: regexPattern } },
          { qualifications: { $regex: regexPattern } }, // Add qualifications search
          { experiences: { $regex: regexPattern } }, // Add experiences search
          { bio: { $regex: regexPattern } }, // Add bio search
          // Add more fields here as needed
        ],
      });
      res.json(doctors);

    }

    
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getDoctorbyid = async (req, res) => {
  const { id } = req.body; // Assuming the doctorId is passed as a route parameter

  try {
    const doctor = await Doctor.findById({_id:id});

    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }
// console.log(doctor)
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'sih202227@gmail.com', 
    pass: '',
  },
});
export const cancelappointment = async (req, res) => {
  const { slot, id, datec } = req.body;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById({ _id: id });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Query appointments based on slot and date
    let appointmentsToCancel = [];

    if (slot === 'All Slots') {
      // Cancel all appointments for the specified date and doctor
      appointmentsToCancel = await Appointment.find({
        doctor: id,
        appointmentDate: datec,
      });

      // Clear all slots for that date in doctor's data
      doctor.appointmentOrganized = doctor.appointmentOrganized.filter((organized) => {
        return organized.date.toISOString() !== datec;
      });
    } else {
      // Cancel specific slot appointments for the specified date
      appointmentsToCancel = await Appointment.find({
        doctor: id,
        appointmentDate: datec,
        slot: slot,
      });

      // Update doctor.appointmentOrganized by removing the canceled slot
      doctor.appointmentOrganized.forEach((organized) => {
        if (organized.date.toISOString() === datec) {
          organized.slots = organized.slots.filter((s) => s.slotTime !== slot);
        }
      });
    }

    console.log('Appointments to Cancel:', appointmentsToCancel);

    // Delete canceled appointments from Appointments collection
    for (const appointment of appointmentsToCancel) {
      const appointmentId = appointment._id;

      // Log the appointment ID before deletion
      console.log('Deleting Appointment ID:', appointmentId);

      const data=await Appointment.findById(appointmentId);
      console.log(data);
      // Send reschedule email to patient
      const mailOptions = {
        from: 'sih202227@gmail.com',
        to: data.patientEmail,
        subject: 'Your appointment has been canceled',
        html: `
          <html>
            <body>
              <h1>Your Appointment has been Canceled</h1>
              <p>Please reschedule your appointment.</p>
            </body>
          </html>
        `,
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    // Save the updated doctor object after appointments are canceled
    await doctor.save();

    res.json({ message: 'Appointments canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

