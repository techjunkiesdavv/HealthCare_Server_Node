import express from 'express';

import { signin,signup ,addappointment} from '../controllers/doctor.js';


const router= express.Router();
router.post('/signin',signin);
 
router.post('/signup',signup);

router.post('/addappointment',addappointment);





export default router;