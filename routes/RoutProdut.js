const express = require('express')
const router=express.Router()
const validateMovie=require('../controllers/validacion.js')
const{allProducts,IDProducts,CampoValor,dataDD, Actualizar,deslete}=require('../controllers/contolador.js')

router.get('/contenido',allProducts);
router.get('/contenido/:ID',IDProducts)
router.get('/contenido/:campo/:valor',CampoValor);
router.post('/contenido',validateMovie,dataDD);
router.patch('/contenido/:ID',Actualizar);
router.delete('/contenido/:ID',deslete);



module.exports=router