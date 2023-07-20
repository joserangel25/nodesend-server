import multer from "multer"
import shortid from "shortid"
import fs from "fs"

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
    console.log(req.file)
    if(!err){
      res.json({ msg: 'Archibo subido correctamente', archivo: req.file.filename })
    } else {
      console.log(err)
      res.status(404).json({ error: err, msg: 'Se presentó un error en el proceso. Intente más tarde.'  })
    }
  })
};

const eliminarArchivo = async (req, res) => {
  console.log(req.archivo)
  const { pathname } = new URL('../uploads', import.meta.url)
  const urlArchivo =  `${pathname.replace('/', '')}/${req.archivo}`.replaceAll('/', String('\\'))

  try {
    fs.unlinkSync(urlArchivo)
    console.log('archivo eliminado')
  } catch (error) {
    console.log(error)
  }
};

export {
  subirArchivo,
  eliminarArchivo
}