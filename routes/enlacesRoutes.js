import express from "express"
import { generarNuevoEnlace, obtenerEnlace, obtenerTodosEnlaces, comprobarClaveEnlace } from "../controllers/enlacesController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const enlacesRoutes = express.Router();

//TODO: crear check de express validator para el nombre del archivo
enlacesRoutes.post('/', checkAuth, generarNuevoEnlace)
enlacesRoutes.get('/', obtenerTodosEnlaces)
enlacesRoutes.get('/:url', obtenerEnlace)
enlacesRoutes.post('/:url', comprobarClaveEnlace)

export default enlacesRoutes