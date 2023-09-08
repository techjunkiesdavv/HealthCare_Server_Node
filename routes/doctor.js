import express from 'express';

import { addappointment} from '../controllers/doctor.js';


const router= express.Router();

router.post('/addappointment',addappointment);





export default router;