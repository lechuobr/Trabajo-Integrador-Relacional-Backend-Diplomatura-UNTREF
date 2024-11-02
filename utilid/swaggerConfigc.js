const swaggerJsdoc=require ('swagger-jsdoc');
const swaggerUi=require ('swagger-ui-express');

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API CRUD ',
            version:'1.0.2024',
            description:'trailerflix'

        },
        basePath:'utilid/'
    },
    apis:['./controllers/*.js','./Documento/*.js'],
    
}

const swaggerDocs=swaggerJsdoc(swaggerOptions)

module.exports={swaggerDocs,swaggerUi}