import multer from "multer"
import shortid from "shortid"
import fs from "fs"
import Enlace from "../models/Enlace.js";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads')
  },
  filename: (req, file, cb) => {
      const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, `${shortid.generate()}${extension}` );
  }
});

const subirArchivo = async (req, res, next) => {
  const configuracionMulter = {
    limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: fileStorage
  }
  
  const uploadArchivo = multer(configuracionMulter).single('archivo')

  uploadArchivo(req, res, (err) => {
    if(!err){
      res.json({ msg: 'Archivo subido correctamente', archivo: req.file.filename })
    } else {
      console.log(err)
      res.status(404).json({ 
        error: err, 
        msg: 'Se presentó un error en el proceso. Intente más tarde.'
      })
    }
  })
};

const eliminarArchivo = async (req, res) => {
  const { pathname } = new URL('../uploads', import.meta.url)
  const urlArchivo =  `${pathname.replace('/', '')}/${req.archivo}`.replaceAll('/', String('\\'))

  try {
    fs.unlinkSync(urlArchivo);
  } catch (error) {
    console.log(error)
  }
};

const descargarArchivo = async (req, res, next) => {
  if(!req.params?.archivo){
    return res.json({error: true, msg: 'Error. No se envió identificador de archivo.'})
  };
  const { archivo } = req.params;
  const enlace = await Enlace.findOne({ nombre: archivo })
  if(!enlace){
    return res.status(401).json({ error: true, msg: 'El enlace ya no existe' })
  };

  const archivoDescarga = `uploads/${archivo}`
  res.download(archivoDescarga)

  //Validar y acciones en cuanto a # de descargas
  const { _id, nombre } = enlace;
  if(enlace.descargas === 1){
    req.archivo = nombre;
    //Eliminar enlace de la DB
    await Enlace.findOneAndDelete(_id)
    //Eliminar archivo  - se hace con el siguiente middleware
    next()
  } else {
    enlace.descargas--;
    await enlace.save()
  }
}

export {
  subirArchivo,
  eliminarArchivo,
  descargarArchivo
}