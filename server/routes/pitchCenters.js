import express from 'express';
import {
    createPitchCenter, 
    updatePitchCenter, 
    deletePitchCenter, 
    getPitchCenter, 
    getPitchCenters
}  from '../controllers/pitchCenter.js'

const router = express.Router();

//CREATE
router.post('/', createPitchCenter);

//Update
router.put('/:id', updatePitchCenter);

//delete
router.delete('/:id', deletePitchCenter);

//get
router.get('/:id', getPitchCenter);

//get all
router.get('/', getPitchCenters);

export default router 