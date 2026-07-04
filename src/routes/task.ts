import { Router } from 'express'; 
import { tasksController } from '../controllers/task.controller'; 
import { authMiddleware } from '../middleware/auth.middleware'; 
import { validate } from '../middleware/validate.middleware'; 
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schemas'; 
 
const router = Router(); 
 
router.get('/project/:projectId', authMiddleware, tasksController.getByProject); 

router.get('/:id',authMiddleware, tasksController.getById); 
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *                 example: Diseñar pantalla login
 *               projectId:
 *                 type: string
 *                 example: 123abc
 *               assignedTo:
 *                 type: string
 *                 example: 456bob
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: TODO
 */
router.post('/',    authMiddleware, validate(createTaskSchema), 
tasksController.create);
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - TODO
 *                   - IN_PROGRESS
 *                   - DONE
 *                   - CANCELLED
 *               assignedTo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/:id',  authMiddleware, validate(updateTaskSchema), tasksController.update); 
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
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
 *         description: Tarea eliminada
 *       404:
 *         description: No encontrada
 */
router.delete('/:id', authMiddleware, tasksController.remove); 
 
export default router; 