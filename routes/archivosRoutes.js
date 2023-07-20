import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { subirArchivo } from "../controllers/archivosController.js";

const archivosRoutes = express.Router();

archivosRoutes.post('/', checkAuth, subirArchivo);

export default archivosRoutes