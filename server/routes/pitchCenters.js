import express from 'express';
import {
    createPitchCenter, 
    updatePitchCenter, 
    deletePitchCenter, 
    getPitchCenter, 
    getPitchCenters,
    countByCity,
    countByType,
    getPitchCenterPitches
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
router.get('/find/:id', getPitchCenter);

//get all
router.get('/', getPitchCenters);
router.get('/countByType', countByType);
router.get('/countByCity', countByCity);
router.get('/pitch/:id', getPitchCenterPitches);

export default router 