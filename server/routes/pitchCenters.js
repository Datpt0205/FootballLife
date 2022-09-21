import express from 'express';
import PitchCenter from '../models/PitchCenter.js'

const router = express.Router();

//CREATE
router.post('/', async (req,res) => {

    const newPitchCenter = new PitchCenter(req.body)

    try{
        const savePitchCenter = await newPitchCenter.save()
        res.status(200).json(savePitchCenter)
    }catch(err){
        res.status(500).json(err)
    }
})

//Update
router.put('/:id', async (req,res) => {
    try{
        const updatedPitchCenter = await PitchCenter.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedPitchCenter)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.delete('/:id', async (req,res) => {
    try{
        await PitchCenter.findByIdAndDelete(req.params.id);
        res.status(200).json("Pitch center has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get
router.get('/:id', async (req,res,next) => {

    try{
        const pitchCenter = await PitchCenter.findById(req.params.id)
        res.status(200).json(pitchCenter)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all
router.get('/', async (req,res) => {

    try{
        const pitchCenters = await PitchCenter.find()
        res.status(200).json(pitchCenters)
    }catch(err){
        next(err)
    }
})

export default router 