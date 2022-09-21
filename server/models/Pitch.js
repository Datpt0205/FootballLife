import mongoose from 'mongoose';

const PitchSchema = new mongoose.Schema({
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
    price:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require: true,
    },
    type:{
        type:String,
        require: true,
    }
})

