import { Router } from "express";
import warehouseRoutes from "./warehouseRoutes";

const router: Router = Router();

router.use('/warehouse', warehouseRoutes);

export default router;