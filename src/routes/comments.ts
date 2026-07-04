import { Router } from 'express'; 
import { commentsController } from '../controllers/comments.controller'; 
import { authMiddleware } from '../middleware/auth.middleware'; 
 
const router = Router(); 
 /**
 * @swagger
 * /api/comments/task/{taskId}:
 *   get:
 *     summary: Obtener comentarios de una tarea
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
router.get('/task/:taskId', authMiddleware, commentsController.getByTask); 
/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Crear comentario
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - taskId
 *             properties:
 *               content:
 *                 type: string
 *               taskId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado
 */
router.post('/',           authMiddleware, commentsController.create); 
/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Eliminar comentario
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Comentario no encontrado
 */
router.delete('/:id',      authMiddleware, commentsController.remove); 
 
export default router;