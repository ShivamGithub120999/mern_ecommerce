import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    parentId:{
        type:String
    }
},
{timestamps:true});

export default mongoose.model('Category',categorySchema);