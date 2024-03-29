import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        createdAt:{type:Date,required:true}
},
{
    versionKey:false,
    autoIndex:true,
})

export default mongoose.model('User', UserSchema)