import express from 'express'
import {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook
} from '../controllers/bookControllers'

const router = express.Router()

router.post('/', createBook)

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Crea un nuevo libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authors:
 *                 type: array
 *                 description: Lista de autores del libro
 *                 items:
 *                   type: string
 *                   description: Id del autor
 *                   example: "6771a909028f797ed3bc8f67"
 *               publisher:
 *                 type: string
 *                 description: Id de editorial
 *                 example: "6771a909038f792ed3bc8f67"
 *               title:
 *                 type: string
 *                 description: Título del libro
 *                 example: "Cien años de soledad"
 *               genre:
 *                 type: string
 *                 description: Género literario del libro
 *                 example: "Realismo mágico"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del libro
 *                 example: 19.99
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de publicación del libro
 *                 example: "22/03/2005"
 *               description:
 *                 type: string
 *                 description: Descripción breve del libro
 *                 example: "Una novela que narra la historia de la familia Buendía."
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/', getAllBooks)

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Obtiene todos los libros filtrados por género y paginación
 *     parameters:
 *       - name: genre
 *         in: query
 *         description: Filtrar por género literario
 *         required: false
 *         schema:
 *           type: string
 *           example: "Realismo mágico"
 *       - name: page
 *         in: query
 *         description: Número de página para paginación
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Número de resultados por página
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de libros obtenida exitosamente
 *       400:
 *         description: Error en los parámetros enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/:id', getBook)

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Obtiene un libro específico por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del libro que se desea obtener
 *         required: true
 *         schema:
 *           type: string
 *           example: "6770c5b04ea2a074765a9532"
 *     responses:
 *       200:
 *         description: Libro obtenido exitosamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.put('/:id', updateBook)

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Actualiza un libro específico por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del libro que se desea actualizar
 *         required: true
 *         schema:
 *           type: string
 *           example: "6771a909028f797ed3bc8f67"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authors:
 *                 type: array
 *                 description: Lista de autores del libro
 *                 items:
 *                   type: string
 *                   description: Id del autor
 *                   example: "6771a909028f797ed3bc8f67"
 *               publisher:
 *                 type: string
 *                 description: Id de editorial
 *                 example: "6771a909038f792ed3bc8f67"
 *               title:
 *                 type: string
 *                 description: Título del libro
 *                 example: "Cien años de soledad"
 *               genre:
 *                 type: string
 *                 description: Género literario del libro
 *                 example: "Realismo mágico"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del libro
 *                 example: 19.99
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de publicación del libro
 *                 example: "1967-06-05"
 *               description:
 *                 type: string
 *                 description: Descripción del libro
 *                 example: "Una novela que narra la historia de la familia Buendía."
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 *
 */

router.delete('/:id', deleteBook)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Elimina un libro específico por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del libro que se desea eliminar
 *         required: true
 *         schema:
 *           type: string
 *           example: "6771a909028f797ed3bc8f67"
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */

export default router
