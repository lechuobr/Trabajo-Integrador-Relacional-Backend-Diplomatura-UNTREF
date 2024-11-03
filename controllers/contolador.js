const { body, validationResult } = require('express-validator');
const {sequelize}=require ('../conexion/database.js')
const{Op}=require('sequelize')
const {contenido}=require ('../models/contenido.js')
const {Categoria}=require('../models/categoria.js')
const {Actor}=require('../models/actor.js')
const {Genero}=require('../models/genero.js')
const {viewpelis}=require('../models/viewpeliculas.js')
const {contenidoActor}=require('../models/contenidoAcrtor.js')
const {GenerosContenido}=require('../models/generosContenido.js')
const express =require('express')
const app = express()
app.use(express.json())


async function initializeDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa');
       await contenido.sync();
       await Categoria.sync();
      await Genero.sync();
      await viewpelis.sync();
      await contenidoActor.sync();
      await GenerosContenido.sync()
      await Actor.sync();
  
      console.log('Modelos sincronizados correctamente');
    } catch (error) {
      console.error('Error de acceso a la base de datos:', error);
      process.exit(1);
    }
  }
  
  
  initializeDatabase();

  app.use((req, res, next) => {
    next(); 
  });

  const allProducts=async(req, res) => {
        try {
           
            const Allproduct=await viewpelis.findAll(/*{offset:0,limit:5}*/)
            if (Allproduct.length===0) {
                res.status(404).json({mensaje:"Sin productos"})
            } else {
                /*const response={
                    results:[...Allproduct],
                    info:{
                        dataOfQuery:new Date(),
                        totalRecords:Allproduct.length || 0,
                        database:sequelize.getDatabaseName()
                    }
                }*/
               res.json(Allproduct)
            }
            
         } catch (error) {
            res.status(500).json({mensaje:"error de acceso a la ddbb"})
            console.log(error)
            
}};


const IDProducts=async(req, res) => {
    try {
        const {ID}=req.params
        const Allproduct=await viewpelis.findByPk(ID)
        
        if (Allproduct == null) {
                res.status(400).json({mensaje:"ID invalido"})
                    
        }else {
           res.json(Allproduct)
         }
        
     } catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
        
}};

const CampoValor=async (req, res) => {
    try {
        const{campo,valor}= req.params
        const lowerCaseCampo = campo.toLowerCase();
        const lowerCaseValor = valor.toLowerCase();

        if (lowerCaseCampo === 'categoria' || lowerCaseCampo === 'genero' || lowerCaseCampo === 'titulo'|| lowerCaseCampo === 'reparto') {

            const Allproduct=await viewpelis.findAll({where:{[lowerCaseCampo]:{[Op.like]:`%${lowerCaseValor}%`}}})
            if (Allproduct.length === 0){
               res.status(404).json({mensaje:"No se encontraron productos"})
          
           }else{
               res.json(Allproduct)
           }
        }else{
            return res.status(400).json({mensaje:'campos invalidos'})
        }           
                   
        
    } catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
        
}};

//creamos la peli

const dataDD=async (req,res)=>{
    try {
       
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

   const {gen,genero,reparto,titulo,categoria,poster,busqueda,resumen,temporadas,trailer,duracion}=req.body
   
    const existe=await contenido.findAll({where:{Titulo:titulo,temporada:temporadas}})
    
    if (existe.length==0) {

        async function Actoresids (reparto){
        try {
            const actores=reparto.split(',').map(e=>e.trim())
        
         const promesas = actores.map(e =>
          Actor.findOrCreate({
           where: { ActorName: e },
         })
         );
  
        const resultados = await Promise.all(promesas);
        const actoresID = resultados.map(([actor, created]) => actor.Actor_Id);
        return actoresID;
      
        } catch (error) {
          console.log(error) 
        }
       }
     //Buscamos los generos y sino los creamos 
       async function generosall(genero) {
      
        try {
            const generos=genero.split(',')
            const promesas = generos.map(e =>
            Genero.findOrCreate({
            where: { Genero_Name: e },
            }));

            const resultados = await Promise.all(promesas);
            const idsgne = resultados.map(([genero, created]) => genero.Genero_ID);
             return idsgne;

        } catch (error) {
            res.status(400).json({mensaje:"error a crear los generos"})
        }
        
       }
      //Buscamos la categoria y sino la creamos
       async function categoriasall(categoria) {
        try {
            const categori=categoria.split(',')
        const promesas = categori.map(e =>
            Categoria.findOrCreate({
            where: { Categori_Name: e },
            
         })
       );
       const resultados = await Promise.all(promesas);
         
       const idsgne = resultados.map(([Categoria,created]) =>Categoria.IdCategori);
             
        return idsgne;
        } catch (error) {
            res.status(400).json({mensaje:"error al crear las categorias"})
        }                
       }
       //unimos toda la info 
       async function crearpelicula(titulo,temporadas,resumen,poster,trailer,duracion,generosall,categoriasall) {
        try {
            const idCategori=await categoriasall(categoria)
            const generoids=await generosall(genero)
            const Genero_ID=generoids[0]
            console.log(Genero_ID)
            
        if (idCategori==1) {

            const nuevapeli=await contenido.create({
                titulo:titulo,
                temporada:temporadas,
                resumen:resumen,
                poster:poster,
                Genero_ID:Genero_ID,
                idCategori:idCategori,
                trailer:trailer,
                busqueda:busqueda
                
            })
                       
            return nuevapeli.Contenido_Id;   

        } else {
            const nuevapeli=await contenido.create({
                titulo:titulo,
                temporada:temporadas,
                resumen:resumen,
                poster:poster,
                Genero_ID:Genero_ID,
                idCategori:idCategori,
                trailer:trailer,
                busqueda:busqueda,
                duracion:duracion
                
            })
                       
            return nuevapeli.Contenido_Id;     
            
        }
            

            
        } catch (error) {
            res.status(400).json({mensaje:"error al crear la pelicula"})
        }
       }
     //completamos las tablas intermedias
         async function ContenidoActoresgeneros(crearpelicula,generosall,Actoresids) {
         try {
       
        const Contenido_Id=await crearpelicula(titulo,temporadas,resumen,poster,trailer,duracion,generosall,categoriasall)
        const Generos=await generosall(genero)
        const actores=await Actoresids(reparto)
        console.log(Contenido_Id)
        const generospeli = Generos.map(e => ({ 
            idGenConte: null, 
            Contenido_Id: Contenido_Id, 
            Genero_ID: e 
          }));
          console.log(generospeli)
          const contenidoA = actores.map(e => ({ 
            id_Cont_Actor: null, 
            Actor_Id: e, 
            Contenido_Id: Contenido_Id 
          }));
         console.log(contenidoA)
        const insertGC=await GenerosContenido.bulkCreate(generospeli)
        const insertAC=await contenidoActor.bulkCreate(contenidoA)
        return Contenido_Id

         } catch (error) {
            res.satus(400).json({mensaje:"error e las tablas intermedias"})
         }        
       
        }
      const exito=await ContenidoActoresgeneros(crearpelicula,generosall,Actoresids) 
      const Pelicreada=await viewpelis.findByPk(exito)
      if (!Pelicreada) {
        return res.status(400).json({mensaje:"error al crear la pelicula"})
      }
      res.status(201).json({mensaje:'peliculacreada',Pelicreada})
    } else {
        res.status(400).json({mensaje:"Contenido existente en nuestra base de datos"})
    }
        
   }
    catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
        console.log(error)
    }
}
//para el metodo patch actualizar,algunas validacion me falta el regex para las url,jpg etc..



const Actualizar=async(req,res)=>{
    try {
        const numero=req.params
        const ID=Number(numero.ID)
        const {gen,genero,reparto,titulo,categoria,poster,busqueda,resumen,temporadas,trailer,duracion}=req.body
        const peli=await contenido.findByPk(ID)
        
        if (!peli) {
            res.status(400).json({mensaje:'no hay contenido con ese ID'})
        } else {
            
                if(titulo){
                  const limpio=titulo.trim()
                  if (typeof limpio=== 'string' && limpio.length > 3) {
                    peli.titulo=limpio
                    await  peli.save()
                    return res.status(200).json({mensaje:"titulo actualizado"})
                  } else {
                   return  res.status(400).json({mensaje:"El titulo es invalido"})
                  }}

               
               if(busqueda){
                 const limpio=busqueda.trim()
                if (typeof limpio=== 'string' && limpio.length > 3) {
                    peli.busqueda=limpio
                    await  peli.save()
                    return res.status(200).json({mensaje:"busqueda actualizado"})
                } else {
                    return  res.status(400).json({mensaje:"busqueda no puede estar vacio"})
                }}

            
               if(resumen){
                const limpio=resumen.trim()
                if (typeof limpio=== 'string' && limpio.length > 3) {
                    peli.resumen=limpio
                    await  peli.save()
                    return res.status(200).json({mensaje:"resumen actualizado"})
                } else {
                    return  res.status(400).json({mensaje:"busqueda no puede estar vacio"})
                }}
             
               if (temporadas) {
                const limpio = temporadas.trim(); 
            
                if (limpio.toUpperCase() === 'N/A' || /^[0-9]+$/.test(limpio)) {
                    peli.temporada = limpio; 
                    await  peli.save()
                    return res.status(200).json({mensaje:"temporada actualizada"})
                } else {
                    
                    return res.status(400).json({ mensaje: "Temporadas debe ser un número entero o 'N/A'" });
                }}
                                                                 
               if(trailer){
                const limpio = trailer.trim();
                if (isValidURL(limpio)) {
                    peli.trailer = limpio;
                    await  peli.save()
                    return res.status(200).json({mensaje:"trailer actualizado"})
                } else {
                    return res.status(400).json({ mensaje: "El campo trailer debe ser una URL válida." });
                }}
               
               if(duracion){
                peli.duracion=duracion 
                await  peli.save()
                return res.status(200).json({mensaje:"duracion actualizado"})
               }

               if(poster){
                const imagenRegex = /\.(jpg|jpeg|png|gif|bmp)$/i
                if (imagenRegex.test(poster)) {
                    peli.poster=poster
                    await  peli.save()
                    return res.status(200).json({mensaje:" actualizado"})
                } else {
                    return res.status(400).json({ mensaje: "El campo no es válido ." })
                }}
                                                 
            }if(genero){
                if (typeof genero === 'string' && genero.trim() !== ''){
                  const generos=genero.split(',')
                  console.log(generos)
                  const promesas = generos.map(e =>
                   Genero.findOrCreate({
                  where: { Genero_Name: e },
                }));

                 const resultados = await Promise.all(promesas);
                 const idsgne = resultados.map(([genero, created]) => genero.Genero_ID);
                 const dlet=await GenerosContenido.destroy({where:{Contenido_Id:ID}})
            
                const contenidoA = idsgne.map(e => ({ 
                   idGentConte: null, 
                   Genero_ID: e, 
                   Contenido_Id:ID 
                }));
          
           const insert=await GenerosContenido.bulkCreate(contenidoA)
           return res.status(200).json({mensaje:"generos actualizados"})

                }
                else{
                    return res.status(400).json({ mensaje: "El campo no es válido ." }); 
                }

            }if(categoria){
                const limpio = categoria.trim();

                if (limpio.length > 1) {
                    const name = limpio;
                    console.log(name);
                
                     const categorName = await Categoria.findOne({
                        where: { Categori_Name: name },
                        attributes: ['idCategori'] // 'attributes' debe ser un array
                    });
                    const idCate = categorName.dataValues.idCategori;
                    console.log(idCate)

                    peli.idCategori=idCate
                    await peli.save()
                    return res.send('categoria actializada')
                } else {
                    console.log('campos vacíos');
                }
                
            }if(reparto){
              
                    const actores=reparto.split(',').map(e=>e.trim())
                    const promesas = actores.map(e =>
                         Actor.findOrCreate({
                          where: { ActorName: e },
                        })
                        );
                 
                       const resultados = await Promise.all(promesas);
                       const actoresID = resultados.map(([actor, created]) => actor.Actor_Id);
                       console.log(actoresID)
                       const eliminar=await contenidoActor.destroy({where:{Contenido_Id:ID}})
                       

                        const contenidoA = actoresID.map(e => ({ 
                            id_Cont_Actor: null, 
                            Actor_Id: e, 
                            Contenido_Id:ID 
                          }));
                       const insert=await contenidoActor.bulkCreate(contenidoA)
                       console.log(contenidoA)
                       return res.status(200).json({mensaje:"reparto actualizado"})
                      
                 }
            
               
        
              
    } catch (error) {
        res.status(500).json({mensaje:"error de acceso a la ddbb"})
        console.log(error)
    }
    }
//con el id de la peliculas eliminas en todas las tablas 


async function deslete(req, res) {
    try {
        const numero = req.params;
        const ID = Number(numero.ID);
        const peli = await contenido.findByPk(ID);
        if (!peli) {
            res.status(400).json({ mensaje: 'sin contenido' });
        } else {
            const Conte = await contenido.destroy({ where: { Contenido_Id: ID } });
            const actorCon = await contenidoActor.destroy({ where: { Contenido_Id: ID } });
            const GenCont = await GenerosContenido.destroy({ where: { Contenido_Id: ID } });
            res.status(204).json({ mensaje: 'Contenido eliminado exitosamente' });

        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar contenido' });
        console.log(error);
    }
}



    

module.exports={allProducts,IDProducts,CampoValor,Actualizar,dataDD,deslete}