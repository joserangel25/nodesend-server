import express from "express"
import { nuevoUsuario } from "../controllers/usuariosController.js"
import { check } from "express-validator"

const router = express.Router()

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Ingrese un email válido').isEmail(),
  check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({min: 6})
], nuevoUsuario)

export default router