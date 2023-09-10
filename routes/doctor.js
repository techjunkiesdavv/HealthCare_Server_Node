import express from 'express';

import { addappointment,getDoctor,getDoctorbyid,cancelappointment} from '../controllers/doctor.js';


const router= express.Router();

router.post('/addappointment',addappointment);

router.post('/cancelappointment',cancelappointment);

router.post('/get',getDoctor);

router.post('/getbyid',getDoctorbyid);





export default router;