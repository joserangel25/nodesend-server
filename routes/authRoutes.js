import express from "express";
import { usuarioAutenticado, loguearUsuario } from "../controllers/authController.js";
import { check } from "express-validator";
import { checkAuth } from "../middleware/checkAuth.js";

const authRoutes = express.Router()

authRoutes.route('/')
  .get(checkAuth, usuarioAutenticado)
  .post([
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
  ], loguearUsuario)

export default authRoutes