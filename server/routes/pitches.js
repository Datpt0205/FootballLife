import express from 'express';
import {
    createPitch, 
    updatePitch, 
    deletePitch, 
    getPitch, 
    getPitches,
    updatePitchAvailability,
}  from '../controllers/pitch.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:pitchCenterid', verifyAdmin, createPitch);

//Update
router.put('/:id', verifyAdmin, updatePitch);
router.put('/availability/:id', updatePitchAvailability);

//delete
router.delete('/:id', verifyAdmin, deletePitch);

//get
router.get('/find/:id', getPitch);

//get all
router.get('/', getPitches);

export default router 