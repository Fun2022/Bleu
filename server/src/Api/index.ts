import { Router } from 'express';
import Registry from './Registry'

const router: Router = Router();

router.use('/register', Registry);

export default router;