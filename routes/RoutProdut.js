const express = require('express')
const router=express.Router()
const{allProducts,IDProducts,CampoValor}=require('../controllers/contolador.js')



router.get('/contenido',allProducts);
router.get('/contenido/:ID',IDProducts)
router.get('/contenido/:campo/:valor',CampoValor);


module.exports=router