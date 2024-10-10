
const {sequelize}=require ('../conexion/database.js')
const {contenido}=require ('../models/contenido.js')
const {Categoria}=require('../models/categoria.js')
const {Genero}=require('../models/genero.js')
const {viewpelis}=require('../models/viewpeliculas.js')
const express =require('express')
const app = express()


app.use(async(req,res,next)=>{
    try {
          await sequelize.authenticate()
          console.log('conexion exitosa')
          await contenido.sync()
          await Categoria.sync()
          await Genero.sync()
          await viewpelis.sync()
          
           next()
    } catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
    }
  });

const allProducts=async(req, res) => {
        try {
            const Allproduct=await viewpelis.findAll()
            if (Allproduct.length===0) {
                res.status(400).json({mensaje:"Sin productos"})
            } else {
               res.json(Allproduct)
            }
            
         } catch (error) {
            res.status(500).json({mensaje:"error de acceso a la ddbb"})
            
}};

const IDProducts=async(req, res) => {
    try {
        const {ID}=req.params
        const Allproduct=await viewpelis.findByPk(ID)
        
        if (Allproduct == null) {
                res.status(400).json({mensaje:"ID invalido"})
   
        }else if (Allproduct.length==0) {
            res.status(400).json({mensaje:"sin product"}) 
        }else {
           res.json(Allproduct)
         }
        
     } catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
        
}};

const CampoValor=async (req, res) => {
    try {
        const{campo,valor}= req.params
        const Allproduct=await viewpelis.findAll({where:{[campo]:valor}})
        console.log(Allproduct)
        if (Allproduct.length === 0){
            res.status(404).json({mensaje:"No se encontraron productos"})
       
        }else{
            res.json(Allproduct)
        }
              
        
    } catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
        
}};



    

module.exports={allProducts,IDProducts,CampoValor}