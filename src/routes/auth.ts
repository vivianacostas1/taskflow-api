import { Router } from 'express'; 
import { authController } from '../controllers/auth.controller'; 
import { authMiddleware } from '../middleware/auth.middleware'; 
import { validate } from '../middleware/validate.middleware'; 
import { registerSchema, loginSchema } from '../schemas/auth.schemas'; 
 
const router = Router(); 
 
// Rutas públicas con validación Zod 

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */

router.post('/register', validate(registerSchema), authController.register); 
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/login',    validate(loginSchema),    authController.login); 
 




// Ruta protegida: necesita token válido 

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener usuario autenticado
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autorizado
 */
router.get('/me', authMiddleware, authController.me);

export default router;