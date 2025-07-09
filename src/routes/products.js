import { Router } from 'express';
import secure from '../middlewares/passportJWT.js';
import { authorizeRoles } from '../middlewares/authorizations.js';
import {createProduct, getProducts} from '../controllers/productControllers.js';

const router = Router();

router.post(
  '/',
  secure,
  authorizeRoles('admin'),
  createProduct
);

router.get('/',
  getProducts
);

export default router;
