import Pitch from "../models/Pitch.js";
import PitchCenter from "../models/PitchCenter.js";
import { createError } from "../utils/error.js";

export const createPitch = async (req, res, next) => {
  const pitchCenterId = req.params.pitchCenterid;
  const newPitch = new Pitch(req.body);

  try {
    const savePitch = await newPitch.save();
    try {
      await PitchCenter.findByIdAndUpdate(pitchCenterId, {
        $push: { pitches: savePitch._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savePitch);
  } catch (err) {
    next(err);
  }
};

export const updatePitch = async (req, res, next) => {
  try {
    const updatedPitch = await Pitch.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPitch);
  } catch (err) {
    next(err);
  }
};

export const updatePitchAvailability = async (req, res, next) => {
  try {
    await Pitch.updateOne(
      { "pitchNumbers._id": req.params.id },
      {
        $push: {
          "pitchNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Pitch status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deletePitch = async (req, res, next) => {
  const pitchCenterId = req.params.pitchCenterid;
  try {
    await Pitch.findByIdAndDelete(req.params.id);
    try {
      await PitchCenter.findByIdAndUpdate(pitchCenterId, {
        $pull: { pitches: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Pitch has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getPitch = async (req, res, next) => {
  try {
    const pitch = await Pitch.findById(req.params.id);
    res.status(200).json(pitch);
  } catch (err) {
    next(err);
  }
};

export const getPitches = async (req, res, next) => {
  try {
    const pitches = await Pitch.find();
    res.status(200).json(pitches);
  } catch (err) {
    next(err);
  }
};
