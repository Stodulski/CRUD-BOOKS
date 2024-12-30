import express from 'express'
import {
  createAuthor,
  getAuthorById,
  getAllAuthors,
  updateAuthor,
  deleteAuthor
} from '../controllers/authorControllers'

const router = express.Router()

router.post('/', createAuthor)

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Crea un nuevo autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Primer nombre del autor
 *                 example: "Gabriel"
 *               lastName:
 *                 type: string
 *                 description: Apellido del autor
 *                 example: "García Márquez"
 *               dni:
 *                 type: string
 *                 description: Documento Nacional de Identidad del autor
 *                 example: "12345678"
 *               nationality:
 *                 type: string
 *                 description: Nacionalidad del autor
 *                 example: "Colombiano"
 *     responses:
 *       201:
 *         description: Autor creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/', getAllAuthors)

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Obtiene todos los autores
 *     responses:
 *       200:
 *         description: Lista de autores obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */

router.get('/:id', getAuthorById)

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Obtiene un autor específico por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del autor que se desea obtener
 *         required: true
 *         schema:
 *           type: string
 *           example: "6770c5b04ea2a074765a9532"
 *     responses:
 *       200:
 *         description: Autor obtenido exitosamente
 *       404:
 *         description: Autor no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.put('/:id', updateAuthor)

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Actualiza un autor específico por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del autor que se desea actualizar
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
 *               firstName:
 *                 type: string
 *                 description: Primer nombre del autor
 *                 example: "Gabriel"
 *               lastName:
 *                 type: string
 *                 description: Apellido del autor
 *                 example: "García Márquez"
 *               dni:
 *                 type: string
 *                 description: Documento Nacional de Identidad del autor
 *                 example: "12345678"
 *               nationality:
 *                 type: string
 *                 description: Nacionalidad del autor
 *                 example: "Colombiano"
 *     responses:
 *       200:
 *         description: Autor actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Autor no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.delete('/:id', deleteAuthor)

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Elimina un autor específico por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del autor que se desea eliminar
 *         required: true
 *         schema:
 *           type: string
 *           example: "6771a909028f797ed3bc8f67"
 *     responses:
 *       200:
 *         description: Autor eliminado exitosamente
 *       404:
 *         description: Autor no encontrado
 *       500:
 *         description: Error en el servidor
 */

export default router
