import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
  const bearer = req.get('Authorization');
  if(bearer){
    const token = bearer.split(' ')[1];
    try {
      const usuarioToken = jwt.verify(token, process.env.SECRET_JWT)
      req.usuario = usuarioToken;
    } catch (error) {
      console.log(error)
      // res.status(401).json({msg: 'Token inválido. No tienes permisos para acceder'})
    }
  }
  next()
}