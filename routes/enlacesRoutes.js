import express from "express"
import { generarNuevoEnlace, obtenerEnlace } from "../controllers/enlacesController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { eliminarArchivo } from "../controllers/archivosController.js";

const enlacesRoutes = express.Router();

//TODO: crear check de express validator para el nombre del archivo
enlacesRoutes.post('/', checkAuth, generarNuevoEnlace)
enlacesRoutes.get('/:url', obtenerEnlace, eliminarArchivo)

export default enlacesRoutes