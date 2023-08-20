import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: 'Doctor', 
  },
  patient: {
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
  },
  patientName: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String, 
    required: true,
  },
 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
