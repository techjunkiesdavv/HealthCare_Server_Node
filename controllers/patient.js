import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // console.log(email);
    // const oldUser = await User.findOne({ email });

    // if (!oldUser) 
    // return res.status(404).json({ message: "User doesn't exist" });

    // const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    // if (!isPasswordCorrect) 
    // return res.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign({ email: oldUser.email, id: oldUser._id },'test', { expiresIn: "1h" });
    
    // const result=oldUser;
    // console.log(tokenn);
    // oldUser["token"]=token;
    // console.log(oldUser);
    res.status(200).json({ result:oldUser,  token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup= async(req,res)=>{
    const {email,password,name,phone}=req.body;
  
    
    
    try {
        
        const existingUser= await Patient.findOne({email});
        
        // console.log(email); 
        if(existingUser)
        {
            return res.status(400).json({message:"User already exist"});
        }
        
        // console.log(firstName);
        const hashedPassword=await bcrypt.hash(password,10);
            // console.log(hashedPassword);
            const result =await Patient.create({email,password:hashedPassword,name,phone});
            
     res.status(200).json({result});

        
        
    } catch (error) {
        
        res.status(500).json({message:"something went wrong"});
    }

}

