import { Router } from 'express';
import controllers from '../controllers/merchantCtrl.js';

const router = Router();

for (const route in controllers) {
  router.route(route)
    .get(controllers[route].get)
    .post(controllers[route].post)
    .put(controllers[route].put)
    .delete(controllers[route].delete);
}

export default router;
