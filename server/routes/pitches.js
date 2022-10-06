import express from 'express';
import {
    createPitch, 
    updatePitch, 
    deletePitch, 
    getPitch, 
    getPitches
}  from '../controllers/pitch.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:pitchCenterid', verifyAdmin, createPitch);

//Update
router.put('/:id', verifyAdmin, updatePitch);
router.put('availability/:id', updatePitch);

//delete
router.delete('/:id/:pitchCenterid', verifyAdmin, deletePitch);

//get
router.get('/:id', getPitch);

//get all
router.get('/', getPitches);

export default router 