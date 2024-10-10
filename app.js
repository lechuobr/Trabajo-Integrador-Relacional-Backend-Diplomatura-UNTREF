process.loadEnvFile()
const port=process.env.PORT
const express =require('express')
const app = express()
const Allcontenido =require('./routes/RoutProdut.js')

app.use(express.json())

app.get('/contenido',Allcontenido)
app.get('/contenido/:ID',Allcontenido)
app.get('/contenido/:campo/:valor',Allcontenido)

app.use((req,res)=>{
    res.status(400).json({mensaje:"Error 400"})
})

app.listen(port, () => {
  console.log('puerto open')
})
