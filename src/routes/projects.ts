import { Router } from 'express'; 
import { projectsController } from '../controllers/projects.controller'; 
 
const router = Router(); 
 
router.get('/',       projectsController.getAll); 
router.get('/:id',    projectsController.getById); 
/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Crear proyecto
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ownerId
 *             properties:
 *               name:
 *                 type: string
 *                 example: TaskFlow Web
 *               ownerId:
 *                 type: string
 *                 example: 8d5d5c7a-1234-5678-90ab-123456789abc
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 *       401:
 *         description: No autorizado
 */
router.post('/',      projectsController.create); 
router.put('/:id',    projectsController.update); 
router.delete('/:id', projectsController.remove); 
 
export default router; 