import mongoose from 'mongoose';

const PitchSchema = new mongoose.Schema({
    title: {
        type:String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    description:{
        type:String,
        require: true,
    },
    pitchNumbers:[{number:Number, unavailableDates: [{ type: Date }]}]
},
    {timestamps:true}
);

export default mongoose.model("Pitch", PitchSchema)



