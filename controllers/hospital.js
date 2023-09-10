import Doctor from '../models/doctor.js';
import Patient from '../models/patient.js';
import Hospital from '../models/hospital.js';



export const getHospital = async (req, res) => {
    const {searchQuery}=req.body
    console.log('hiiiii',searchQuery)
   
    try {
      // Fetch all doctors from the database
      if(searchQuery===''){
      const hospital = await Hospital.find();
      res.json(hospital);}
      else{
        const regexPattern = new RegExp(searchQuery, 'i'); // 'i' flag for case-insensitive search

        // Use the $or operator to search multiple fields with regex
        // Additionally, use $in operator to search for specific tests, treatments, and specialist doctors
        const hospitals = await Hospital.find({
            $or: [
              { name: { $regex: regexPattern } },
              { email: { $regex: regexPattern } },
              { address: { $regex: regexPattern } },
              { specialistDoctors: { $regex: regexPattern } },
              { selectedTreatments: { $regex: regexPattern } },
              { phoneNo: { $regex: regexPattern } },
            ], // Search for hospitals with specific test
          });
        console.log(hospitals)
        res.json(hospitals);
  
      }
  
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
    