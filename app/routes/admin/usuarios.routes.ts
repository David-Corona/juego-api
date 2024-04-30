import express from 'express';
import * as UsuariosAdminController from '../../controllers/admin/usuarios.controller';
import { checkRole } from '../../middleware/check-role';
import { checkAuth } from '../../middleware/check-auth';

// checkAuth, checkRole, 
const router = express.Router();
router.get("/", UsuariosAdminController.findAll);
router.post("/create", UsuariosAdminController.create);
router.post("/delete", UsuariosAdminController.remove);

export default router;