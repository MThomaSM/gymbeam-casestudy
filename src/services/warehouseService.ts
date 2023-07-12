import {PickingOrderItem, PickingOrderResult, Point, ProductPosition, ProductPositions} from "../models/warehouse";
import axios from "axios";

export const calculateDistanceBetweenTwoPoints = (a: Point, b: Point): number => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
export const calculateTotalDistance = (positions: ProductPosition[]): number => {
    let totalDistance = positions[0].distanceFromOrigin as number || 0;
    for (let i = 0; i < positions.length - 1; i++)
        totalDistance += calculateDistanceBetweenTwoPoints(positions[i], positions[i + 1]);
    return totalDistance;
};

export const onlyInStock = (positions: ProductPosition[]): ProductPosition[] => { //not sure if needed
    return positions.filter(position => position.quantity > 0);
};

export const calculateDistanceFromOrigin = (position: ProductPosition, origin: Point): ProductPosition => {
    return { ...position, distanceFromOrigin: calculateDistanceBetweenTwoPoints(position, origin) };
};

export const sortByDistanceFromOrigin = (positions: ProductPosition[], origin: Point): ProductPosition[] => {
    return onlyInStock(positions)
        .map(position => calculateDistanceFromOrigin(position, origin))
        .sort((a, b) => a.distanceFromOrigin! - b.distanceFromOrigin!);
};

export const createPickingOrder = (positions: ProductPositions): PickingOrderResult => {
    const pickingOrder: PickingOrderItem[] = Object.keys(positions).map(productId => ({
        productId,
        positionId: positions[productId][0].positionId //because here it will be already sorted
    }));

    pickingOrder.sort((a: PickingOrderItem, b: PickingOrderItem) => {
        const positionA: ProductPosition = positions[a.productId][0];
        const positionB: ProductPosition = positions[b.productId][0];
        return positionA.distanceFromOrigin! - positionB.distanceFromOrigin!;
    });

    const allPositions: ProductPosition[] = pickingOrder.map((item: PickingOrderItem) => positions[item.productId][0]);
    const distance: number = calculateTotalDistance(allPositions);

    return { pickingOrder, distance: Math.round(distance) };
};

export const getProductPositions = async(product: string): Promise<ProductPosition[]> => {
    const positionsReq = await axios.get<ProductPosition[]>(`https://dev.aux.boxpi.com/case-study/products/${product}/positions`, {
        headers: { 'x-api-key': process.env.GYMBEAM_API_KEY || "" }
    });
    return positionsReq.status === 200 ? positionsReq.data : [];
}