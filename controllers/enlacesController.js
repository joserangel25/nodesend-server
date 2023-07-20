import { cambiarNombreEnlaces } from "../helpers/enlaces.js";
import { hashearPasword } from "../helpers/hashPasswords.js";
import Enlace from "../models/Enlace.js"
import shortid from "shortid";

const generarNuevoEnlace = async (req, res) => {

  const { nombre_original } = req.body;

  const idDocument = shortid.generate()

  const newEnlace = new Enlace()
  newEnlace.url = idDocument;
  newEnlace.nombre = `${cambiarNombreEnlaces(nombre_original)}-${idDocument}`;
  newEnlace.nombre_original = nombre_original;

  if(req.usuario){
    const { password = null, descargas = 1 } = req.body
    newEnlace.password = await hashearPasword(password);
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

const obtenerEnlace = async (req, res, next) => {
  const { url } = req.params
  const enlaceEncontrado = await Enlace.findOne({ url })
  if(!enlaceEncontrado){
    return res.status(404).json({ msg: 'El archivo ya no existe.' })
  } 
  res.json({ archivo: enlaceEncontrado.nombre })

  //Validar y acciones en cuanto a # de descargas
  if(enlaceEncontrado.descargas === 1){
    req.archivo = enlaceEncontrado.nombre;
    //Eliminar enlace de la DB
    await Enlace.findOneAndDelete(url)
    
    //Eliminar archivo  - se hace con el siguiente middleware
    next()
  } else {
    enlaceEncontrado.descargas--;
    await enlaceEncontrado.save()
  }
}

export {
  generarNuevoEnlace,
  obtenerEnlace
}