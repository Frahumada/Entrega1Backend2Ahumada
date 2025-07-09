import { Router } from 'express';
import secure from '../middlewares/passportJWT.js';
import { authorizeRoles } from '../middlewares/authorizations.js';
import { addProductToCart, purchaseCart } from '../controllers/cartController.js';

const router = Router();

router.post('/:cid/purchase', secure, authorizeRoles('user'), purchaseCart);

router.post(
  '/:cid/products/:pid',  secure,  authorizeRoles('user'),  addProductToCart);

export default router;