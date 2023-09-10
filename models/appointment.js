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
  patientEmail: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  tokenNumber: {
    type: Number,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
