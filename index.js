import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import enlacesRoutes from "./routes/enlacesRoutes.js";
import archivosRoutes from "./routes/archivosRoutes.js";

//Creando el Servidor
const app = express()
app.use(express.json());

dotenv.config()

//Conectado a la DB
conectarDB()

//Habilitar CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL
}
app.use(cors(corsOptions))

//Puerto App
const PORT = process.env.PORT || 4000

//Rutas de la App
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/enlaces', enlacesRoutes)
app.use('/api/archivos', archivosRoutes)

app.listen(PORT, ()=> {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})