import express from 'express';
import {
    createPitchCenter, 
    updatePitchCenter, 
    deletePitchCenter, 
    getPitchCenter, 
    getPitchCenters
}  from '../controllers/pitchCenter.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createPitchCenter);

//Update
router.put('/:id', verifyAdmin, updatePitchCenter);

//delete
router.delete('/:id', verifyAdmin, deletePitchCenter);

//get
router.get('/:id', getPitchCenter);

//get all
router.get('/', getPitchCenters);

export default router 