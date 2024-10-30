const { body, validationResult } = require ('express-validator');

const validateMovie = [
  body('titulo')
    .trim()
    .notEmpty().withMessage('El título es obligatorio.')
    .isLength({ min: 1, max: 100 }).withMessage('El título debe tener entre 1 y 100 caracteres.'),

  body('categoria')
     .trim()
     .customSanitizer(value => value.toLowerCase())
    .notEmpty().withMessage('La categoría es obligatoria.')
    .isIn(['serie', 'película','Serie','Pelicula']).withMessage('La categoría debe ser "serie" o "película".'),

  body('poster')
  .custom(value => {
    const rutaValida = /^\.\/posters\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png)$/;
    if (!rutaValida.test(value)) {
      throw new Error('El póster debe estar en la carpeta ./posters/ y tener una extensión válida (.jpg, .jpeg, .png).');
    }
    return true; 
  }),
 
  body('temporadas')
    .optional()
    .custom(value => {
      if (value === 'N/A') {
        return true; 
      }
      if (Number.isInteger(Number(value))) {
        return true; 
      }
      throw new Error('El campo debe ser un número entero o "N/A".');
    }),
    
  body('trailer')
    .optional()
    .isURL().withMessage('El tráiler debe ser una URL válida.'),
  
  body('duracion')
    .optional(),
    
  body('reparto')
  .notEmpty().withMessage('obligatorio.')
  .isString().withMessage('debe ser string.'),

  body('genero')
  .notEmpty().withMessage('obligatorio.')
  .isLength({ min: 1, max: 100 }).withMessage(' debe tener entre 1 y 100 caracteres.'),

  body('busqueda')
  .notEmpty().withMessage('obligatorio.')
  .isString().withMessage('debe ser string.'),
  
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = validateMovie



