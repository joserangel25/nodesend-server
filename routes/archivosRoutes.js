import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { subirArchivo, descargarArchivo, eliminarArchivo } from "../controllers/archivosController.js";

const archivosRoutes = express.Router();

archivosRoutes.post('/', checkAuth, subirArchivo);
archivosRoutes.get('/:archivo', descargarArchivo, eliminarArchivo)

export default archivosRoutes