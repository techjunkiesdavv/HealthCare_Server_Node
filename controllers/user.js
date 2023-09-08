import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from '../models/doctor.js';
import Patient from '../models/patient.js';
import Hospital from '../models/hospital.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user= await Patient.findOne({ email });
  
      if (!user) 
       user = await Doctor.findOne({ email });

    else if(!user)
    {
        user = await Hospital.findOne({email});
    }
    else{

        return res.status(404).json({ message: "User doesn't exist" });
    }


  
      const isPasswordCorrect = await bcrypt.compare(password,user.password);
  
      if (!isPasswordCorrect) 
      return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: user.email, id: user._id },'test', { expiresIn: "1h" });
  
      res.status(200).json({ result:user,  token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };





  export const signup = async(req,res)=>{
    const data = req.body;
    try {
        if(data.category==='hospital')
        {   console.log(data);
           const {namee,email,password,phoneNo,address,availableTests,selectedTreatments,specialistDoctors}=req.body;
           try {
           
            const existingUser = await Hospital.findOne({ email });
            
            if (existingUser) {
              return res.status(400).json({ message: "User already exists" });
            }
          

            const hashedPassword = await bcrypt.hash(password,10);

       
            const newHospital = await Hospital.create({
                email,
                password:hashedPassword,
                name:namee,
                phoneNo,
                address,
                availableTests,
                selectedTreatments,
                specialistDoctors

             
              });
              const token = jwt.sign( { email: newHospital.email, id: newHospital._id },'test', { expiresIn: "1h" } );
        
          
              res.status(200).json({ message: "hospital registered successfully", newHospital,token });
            } catch (error) {
              console.error("Error in signup:", error);
              res.status(500).json({ message: "Something went wrong" });
            }


        }
        else if(data.category==='doctor')
        {
            const {
                email,
                password,
                name,
                phone,
                photo,
                ticketPrice,
                role,
                specialization,
                qualifications,
                experiences,
                bio,
                about,
                timeSlots,
                reviews,
                averageRating,
                workingDays,
                timeSlotsPerDay,
                avgTimePerPatient,
                selectedSlotTimings,
                appointments,
              } = req.body;
            
              try {
           console.log(email);
                const existingUser = await Doctor.findOne({ email });
            
                if (existingUser) {
                  return res.status(400).json({ message: "User already exists" });
                }
            
          
                const hashedPassword = await bcrypt.hash(password, 10);
            
         
                const newDoctor = await Doctor.create({
                  email,
                  password: hashedPassword,
                  name,
                  phone,
                  photo,
                  ticketPrice,
                  role,
                  specialization,
                  qualifications,
                  experiences,
                  bio,
                  about,
                  timeSlots,
                  reviews,
                  averageRating,
                  workingDays,
                  timeSlotsPerDay,
                  avgTimePerPatient,
                  slotTimings:selectedSlotTimings,
                  appointments,
                });
                const token = jwt.sign( { email: newDoctor.email, id: newDoctor._id },'test', { expiresIn: "1h" } );
        
          
                res.status(200).json({ message: "hospital registered successfully", newDoctor,token });
              } catch (error) {
                console.error("Error in signup:", error);
                res.status(500).json({ message: "Something went wrong" });
              }
        }
        else{
            
            const {email,password,namee,phone, aadharCardNo,address}=req.body;
  
    
    
    try {
        
        const existingUser= await Patient.findOne({email});
        
     
        if(existingUser)
        {
            return res.status(400).json({message:"User already exist"});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
         
            const result =await Patient.create({email,password:hashedPassword,name:namee,phone, aadharCardNo,address,videoAppointment:''});
            
            const token = jwt.sign( { email: result.email, id: result._id },'test', { expiresIn: "1h" } );
        
          
            res.status(200).json({ message: "hospital registered successfully", result,token });

        
        
    } catch (error) {
        
        res.status(500).json({message:"something went wrong"});
    }

        }
        
    } catch (error) {
        
    }
  }