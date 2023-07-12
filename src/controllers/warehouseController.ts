import { NextFunction, Request, Response } from "express";
import {
    RequestProducts,
    ProductPositions,
    Point, PickingOrderResult,
} from "../models/warehouse";
import {createPickingOrder, getProductPositions, sortByDistanceFromOrigin} from "../services/warehouseService";
import catchAsync from "../utils/catchAsync";

export const getSortedPickingOrder = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bodyOrder: RequestProducts = req.body;
    const resultPositions: ProductPositions = {};
    const originPoint: Point = req.body.originPoint || { x: 0, y: 0, z: 0 };

    for (const product of bodyOrder.products) {
        const productPositions = await getProductPositions(product);
        resultPositions[product] = sortByDistanceFromOrigin(productPositions, originPoint);
    }

    const result: PickingOrderResult = createPickingOrder(resultPositions);

    res.json(result);
});
