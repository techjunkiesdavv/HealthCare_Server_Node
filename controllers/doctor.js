import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';
import Appointment from '../models/appointment.js'; 

const secret = 'test';


export const addappointment = async (req, res) => {
    const { doctorId, patientId, patientName, appointmentDate, slotTime } = req.body;
  
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
        patientName,
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
  

