import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
  FirstName: {type: String, required: true, maxlength: 50 },
  LastName: { type: String, required: true, maxlength: 50 },
  User: {type: String, required: true, maxlength:30, unique: true },
  Email: {type: String, required: true, maxlength:100, unique: true},
  Password:{ type:String, required: true}
})


export default mongoose.models.User || mongoose.model('User',UserSchema)