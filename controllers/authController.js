import Usuario from "../models/Usuario.js"
import { validationResult } from "express-validator"
import { generarJWT } from "../helpers/jwt.js"
import { compararPassword } from "../helpers/hashPasswords.js"

const loguearUsuario = async (req, res) => {

  const errores = validationResult(req)
  if(!errores.isEmpty()){
    return res.status(400).json({ error: errores.array() })
  }

  //Verificar que el usuario exista
  const { email, password } = req.body
  const usuarioEncontrado = await Usuario.findOne({ email });
  if(!usuarioEncontrado){
    return res.status(403).json({ msg: 'El email ingresado no existe en el sistema.' })
  }

  //Verificar password y autenticar usuario
  if(await compararPassword(password, usuarioEncontrado.password)){
    const usuarioRes = {
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      id: usuarioEncontrado._id,
      token: generarJWT({
        nombre: usuarioEncontrado.nombre,
        id: usuarioEncontrado._id
      })
    }
    res.json(usuarioRes)
  } else {
    res.status(401).json({msg: 'La contraseña es incorrecta. Intente nuevamente'})
  }

}

const usuarioAutenticado =  (req, res) => {

  if(!req.usuario){
    const error = new Error('No hubo token')
    return res.status(403).json({msg: error.message})
  }
  res.json({ usuario: req.usuario })
}

export {
  loguearUsuario,
  usuarioAutenticado
}