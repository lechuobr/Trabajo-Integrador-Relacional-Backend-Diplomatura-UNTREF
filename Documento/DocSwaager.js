/**
 * @swagger
 * /contenido:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: 
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   title:
 *                     type: string
 *                     description: Título del producto
 *                   category:
 *                     type: string
 *                     description: Categoría del producto
 *       404:
 *         description: Sin productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error de acceso a la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error
 */

     
//buscamos productos por ID
/**
* @swagger
* /contenido/{ID}:
*   get:
*     summary: Obtener producto por ID
*     tags: 
*       - Productos
*     parameters:
*       - in: path
*         name: ID
*         required: true
*         description: ID del producto
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Producto encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: ID del producto
*                 title:
*                   type: string
*                   description: Título del producto
*                 category:
*                   type: string
*                   description: Categoría del producto
*       400:
*         description: ID inválido
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de error
*       500:
*         description: Error de acceso a la base de datos
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de error
*/


/**
 * @swagger
 * /contenido/{campo}/{valor}:
 *   get:
 *     summary: Busca productos en base a un campo específico
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: campo
 *         required: true
 *         description: El campo por el cual se va a buscar. Puede ser 'categoria', 'genero', 'titulo' o 'reparto'.
 *         schema:
 *           type: string
 *       - in: path
 *         name: valor
 *         required: true
 *         description: El valor a buscar en el campo especificado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Productos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Inception"
 *                   categoria:
 *                     type: string
 *                     example: "Ciencia Ficción"
 *                   genero:
 *                     type: string
 *                     example: "Acción"
 *                   reparto:
 *                     type: string
 *                     example: "Leonardo DiCaprio, Joseph Gordon-Levitt"
 *       404:
 *         description: No se encontraron productos.
 *       400:
 *         description: Campos inválidos.
 *       500:
 *         description: Error de acceso a la base de datos.
 */

//Creamos la pelicula rejunta la info de las varias tablas 
/**
 * @swagger
 * /contenido:
 *   post:
 *     summary: Crea un nuevo contenido
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del contenido.
 *                 example: "Inception"
 *               busqueda:
 *                 type: string
 *                 description: Término de búsqueda asociado.
 *                 example: "Ciencia ficción, thriller, Leonardo DiCaprio"
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *                 example: "A mind-bending thriller about dreams within dreams."
 *               temporadas:
 *                 type: string
 *                 description: Número de temporadas o 'N/A'.
 *                 example: "N/A"
 *               trailer:
 *                 type: string
 *                 description: URL del tráiler.
 *                 example: "https://example.com/trailer.mp4"
 *               duracion:
 *                 type: string
 *                 description: Duración del contenido en minutos.
 *                 example: "148 minutos"
 *               poster:
 *                 type: string
 *                 description: URL de la imagen del póster.
 *                 example: "https://example.com/poster.jpg"
 *               genero:
 *                 type: string
 *                 description: Género del contenido (separados por comas).
 *                 example: "Ciencia Ficción, Thriller"
 *               categoria:
 *                 type: string
 *                 description: Categoría del contenido.
 *                 example: "Película"
 *               reparto:
 *                 type: string
 *                 description: Reparto del contenido (separados por comas).
 *                 example: "Leonardo DiCaprio, Ellen Page, Tom Hardy"
 *     responses:
 *       201:
 *         description: Película creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Película creada exitosamente"
 *                 Pelicreada:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       example: "Inception"
 *       400:
 *         description: Contenido existente o error en los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "El contenido ya existe"
 *       500:
 *         description: Error de acceso a la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error en la base de datos"
 */

/**
 * @swagger
 * /contenido/{ID}:
 *   patch:
 *     summary: Actualiza un contenido existente
 *     tags: [Productos]
 *     description: Permite actualizar los detalles de una película o serie en la base de datos utilizando su ID. Se pueden actualizar campos como título, búsqueda, resumen, temporadas, tráiler, duración, poster, género, categoría y reparto.
 *     parameters:
 *       - name: ID
 *         in: path
 *         required: true
 *         description: El ID del contenido que se desea actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del contenido (mínimo 4 caracteres).
 *               busqueda:
 *                 type: string
 *                 description: Término de búsqueda asociado (mínimo 4 caracteres).
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido (mínimo 4 caracteres).
 *               temporadas:
 *                 type: string
 *                 description: Número de temporadas o 'N/A'.
 *               trailer:
 *                 type: string
 *                 description: URL del tráiler (debe ser una URL válida).
 *               duracion:
 *                 type: integer
 *                 description: Duración del contenido en minutos.
 *               poster:
 *                 type: string
 *                 description: URL de la imagen del póster (debe ser una URL de imagen).
 *               genero:
 *                 type: string
 *                 description: Género del contenido (separados por comas).
 *               categoria:
 *                 type: string
 *                 description: Categoría del contenido.
 *               reparto:
 *                 type: string
 *                 description: Reparto del contenido (separados por comas).
 *     responses:
 *       200:
 *         description: Contenido actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Contenido actualizado con éxito."
 *       400:
 *         description: Solicitud mal formulada o contenido no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "El título es inválido."
 *       500:
 *         description: Error de acceso a la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error de acceso a la base de datos."
 */


/**
 * @swagger
 * /contenido/{ID}:
 *   delete:
 *     summary: Elimina un contenido existente
 *     tags: [Productos]
 *     description: Permite eliminar una película o serie de la base de datos utilizando su ID.
 *     parameters:
 *       - name: ID
 *         in: path
 *         required: true
 *         description: El ID del contenido que se desea eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contenido eliminado exitosamente.
 *       400:
 *         description: Contenido no encontrado o sin contenido.
 *       500:
 *         description: Error al eliminar contenido.
 */