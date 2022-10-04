import PitchCenter from "../models/PitchCenter.js";

export const createPitchCenter = async (req, res, next) => {
  const newPitchCenter = new PitchCenter(req.body);

  try {
    const savePitchCenter = await newPitchCenter.save();
    res.status(200).json(savePitchCenter);
  } catch (err) {
    next(err);
  }
};

export const updatePitchCenter = async (req, res, next) => {
  try {
    const updatedPitchCenter = await PitchCenter.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPitchCenter);
  } catch (err) {
    next(err);
  }
};

export const deletePitchCenter = async (req, res, next) => {
  try {
    await PitchCenter.findByIdAndDelete(req.params.id);
    res.status(200).json("Pitch center has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getPitchCenter = async (req, res, next) => {
  try {
    const pitchCenter = await PitchCenter.findById(req.params.id);
    res.status(200).json(pitchCenter);
  } catch (err) {
    next(err);
  }
};

export const getPitchCenters = async (req, res, next) => {
  try {
    const pitchCenters = await PitchCenter.find();
    res.status(200).json(pitchCenters);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return PitchCenter.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const sportCenterCount = await PitchCenter.countDocuments({
      type: "sport center",
    });
    const personalCount = await PitchCenter.countDocuments({
      type: "personal pitch",
    });
    res.status(200).json([
      { type: "sport center", count: sportCenterCount },
      { type: "personal pitch", count: personalCount },
    ]);
  } catch (err) {
    next(err);
  }
};
