import express from 'express'
import {
  createEditorial,
  getEditorialById,
  getAllEditorials,
  updateEditorial,
  deleteEditorial
} from '../controllers/editorialControllers'

const router = express.Router()

router.post('/', createEditorial)

/**
 * @swagger
 * /editorials:
 *   post:
 *     summary: Crea una nueva editorial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la editorial
 *                 example: "Penguin Random House"
 *               address:
 *                 type: string
 *                 description: Dirección de la editorial
 *                 example: "1234 Calle Ficticia, Ciudad, País"
 *               cuit:
 *                 type: string
 *                 description: CUIT de la editorial
 *                 example: "20-12345678-9"
 *     responses:
 *       201:
 *         description: Editorial creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/', getAllEditorials)

/**
 * @swagger
 * /editorials:
 *   get:
 *     summary: Obtiene todas las editoriales
 *     responses:
 *       200:
 *         description: Lista de editoriales obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */

router.get('/:id', getEditorialById)

/**
 * @swagger
 * /editorials/{id}:
 *   get:
 *     summary: Obtiene una editorial específica por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la editorial que se desea obtener
 *         required: true
 *         schema:
 *           type: string
 *           example: "6770c5b04ea2a074765a9532"
 *     responses:
 *       200:
 *         description: Editorial obtenida exitosamente
 *       404:
 *         description: Editorial no encontrada
 *       500:
 *         description: Error en el servidor
 */

router.put('/:id', updateEditorial)

/**
 * @swagger
 * /editorials/{id}:
 *   put:
 *     summary: Actualiza una editorial específica por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la editorial que se desea actualizar
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
 *               name:
 *                 type: string
 *                 description: Nombre de la editorial
 *                 example: "Penguin Random House"
 *               address:
 *                 type: string
 *                 description: Dirección de la editorial
 *                 example: "1234 Calle Ficticia, Ciudad, País"
 *               cuit:
 *                 type: string
 *                 description: CUIT de la editorial
 *                 example: "20-12345678-9"
 *     responses:
 *       200:
 *         description: Editorial actualizada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Editorial no encontrada
 *       500:
 *         description: Error en el servidor
 */

router.delete('/:id', deleteEditorial)

/**
 * @swagger
 * /editorials/{id}:
 *   delete:
 *     summary: Elimina una editorial específica por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la editorial que se desea eliminar
 *         required: true
 *         schema:
 *           type: string
 *           example: "6771a909028f797ed3bc8f67"
 *     responses:
 *       200:
 *         description: Editorial eliminada exitosamente
 *       404:
 *         description: Editorial no encontrada
 *       500:
 *         description: Error en el servidor
 */

export default router
