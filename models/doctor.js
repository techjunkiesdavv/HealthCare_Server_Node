import mongoose from 'mongoose';



const doctorSchema = mongoose.Schema({

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },

  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  workingDays: {
    type: [String], 
  },
  timeSlotsPerDay: {
    type: Number, 
  },
  avgTimePerPatient:{
    type:Number,
  },
  slotTimings: {
    type: [String], 
  },

    appointmentOrganized: [
    {_id:false,
      date: {
        type: Date,
        required: true,
        
      },
      slots: [
        {_id:false,
          slotTime: String, // Store the slot's time string (e.g., "09:00 AM - 10:00 AM")
          appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }],
        },
      ],
    },
  ],


});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

