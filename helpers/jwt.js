import jwt from "jsonwebtoken"

export const generarJWT = (datos) => {
  return jwt.sign(datos, process.env.SECRET_JWT, {
    expiresIn: '1h'
  })
}