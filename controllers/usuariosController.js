import Usuario from "../models/Usuario.js"
import { validationResult } from "express-validator"
import { hashearPasword } from "../helpers/hashPasswords.js";

const nuevoUsuario = async (req, res) => {
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({ error: errores.array() })
  }

  try {
    const newUsuario = new Usuario(req.body)
    //Hasear el password
    newUsuario.password = await hashearPasword(newUsuario.password)
    await newUsuario.save()
    res.json({msg: 'Usuario creado éxitosamente'})
  } catch (error) {
    console.log(`Se presentó error creando al usuario. ${error}`)
    res.status(403).json({msg: `Se presentó error creando al usuario`, typeError: error.message})
  }
}

export {
  nuevoUsuario
}