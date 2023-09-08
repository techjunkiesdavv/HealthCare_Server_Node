import mongoose from 'mongoose';

// Define the schema
const healthInfo= new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  subheadings: [
    {
      subheading: {
        type: String,
        required: true,
      },
      subDescription: {
        type: String,
        required: true,
      },
    },
  ],
});
const HealthInfo = mongoose.model('HealthInfo',healthInfo);

export default HealthInfo;
