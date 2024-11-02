
const port=process.env.PORT || 3000
const express = require('express')
const app = express()
const Allcontenido =require('./routes/RoutProdut.js')
const { swaggerUi, swaggerDocs } = require('./utilid/swaggerConfigc.js')

app.use(express.json())
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
app.get('/contenido',Allcontenido)
app.get('/contenido/:ID',Allcontenido)
app.get('/contenido/:campo/:valor',Allcontenido)
app.post('/contenido',Allcontenido)
app.patch('/contenido/:ID',Allcontenido)
app.delete('/contenido/:ID',Allcontenido)

app.use((req,res)=>{
    res.status(400).json({mensaje:"Error 400"})
})

app.listen(port, () => {
  console.log('puerto open')
})
