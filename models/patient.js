import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  // Add a field to store booked appointments
  bookedAppointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Appointment', // Reference to the Appointment model
    },
  ],
  // Add more fields as needed for patient information
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
