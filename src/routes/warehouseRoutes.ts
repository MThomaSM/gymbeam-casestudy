import { Router } from "express";
import {getSortedPickingOrder} from "../controllers/warehouseController";
import validate from "../middlewares/validate";
import warehouseSchema from "../validation_schemas/warehouse";

const router: Router = Router();

router.post('/get-picking-order', validate(warehouseSchema), getSortedPickingOrder);

export default router;