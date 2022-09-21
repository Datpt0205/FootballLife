import mongoose from 'mongoose';

const PitchCenterSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true,
    },
    type:{
        type:String,
        require: true,
    },
    address:{
        type:String,
        require: true,
    },
    distance:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require: true,
    },
    photos:{
        type: [String]
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    pitches:{
        type:[String]
    },
    cheapestPrice:{
        type:Number,
        require: true,
    },
    featured:{
        type:Boolean,
        default: false,
    },
    
})

export default mongoose.model("PitchCenter", PitchCenterSchema)

