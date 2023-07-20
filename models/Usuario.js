import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  }
},
{
  timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario