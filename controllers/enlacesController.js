import { compararPassword, hashearPasword } from "../helpers/hashPasswords.js";
import Enlace from "../models/Enlace.js"
import shortid from "shortid";

const generarNuevoEnlace = async (req, res) => {

  const { nombre_original, nombreArchivoNodesend } = req.body;

  const idDocument = shortid.generate()

  const newEnlace = new Enlace()
  newEnlace.url = idDocument;
  newEnlace.nombre = nombreArchivoNodesend;
  newEnlace.nombre_original = nombre_original;

  if(req.usuario){
    const { password = null, descargas = 1 } = req.body
    newEnlace.password = password ? await hashearPasword(password) : password;
    newEnlace.descargas = descargas
    newEnlace.autor = req.usuario.id
  }
  
  try {
    await newEnlace.save()
    res.json({ msg: 'Se guardó exitosamente', urlArchivo: newEnlace.url })
  } catch (error) {
    console.log(error)
    res.status(403).json({ msg: 'Hubo un error en el proceso', error })
  }
};

const obtenerEnlace = async (req, res) => {
  const { url } = req.params
  const enlaceEncontrado = await Enlace.findOne({ url })
  if(!enlaceEncontrado){
    return res.status(404).json({ msg: 'El archivo ya no existe.' })
  }
  const password = enlaceEncontrado.password ? true : false 
  res.json({ 
    archivo: enlaceEncontrado.nombre, 
    nombreOriginal: enlaceEncontrado.nombre_original, 
    password,
    descargas: enlaceEncontrado.descargas 
  })
};

const obtenerTodosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlace.find({}).select('url -_id');
    res.json(enlaces)
  } catch (error) {
    console.log(error)
  }
};

const comprobarClaveEnlace = async (req, res) => {
  const { url } = req.params;
  const { password } = req.body;
  const enlace = await Enlace.findOne({ nombre: url });
  if(!enlace){
    const error = new Error('No existe este archivo en la base de datos');
    return res.status(404).json({error: true, msg: error.message})
  }
  const esCorrecto = await compararPassword(password, enlace.password)
  res.json({ esCorrecto })
};

export {
  generarNuevoEnlace,
  obtenerEnlace,
  obtenerTodosEnlaces,
  comprobarClaveEnlace
}