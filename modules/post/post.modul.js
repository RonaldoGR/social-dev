import mongoose from "mongoose"

import  User  from '../user/user.model'
// criando um modelo que descreve como os documentos em uma coleção
// no MongoDB devem aparecer
const PostSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 256},
  createdDate: { type: Date, required: true},
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 
    'User' } // tipo: objeto ID, ID do objeto do MongoDB
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)