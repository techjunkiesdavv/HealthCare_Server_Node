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
  videoAppointment: {
    type: String,
  },
  aadharCardNo: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true,
  },
  bookedAppointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Appointment', 
    },
  ],

});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
