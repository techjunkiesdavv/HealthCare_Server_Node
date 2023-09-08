import mongoose from 'mongoose';

const hospitalRegistrationSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      lowercase: true, 
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    availableTests: {
        type: [String],
        required: true,
      },
    selectedTreatments: {
      type: [String],
      required: true,
    },
    specialistDoctors: {
      type: [String],
      required: true,
    },
  });
  

  const Hospital = mongoose.model('Hospital', hospitalRegistrationSchema);

  export default Hospital;