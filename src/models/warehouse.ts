
export interface Point {
    x: number,
    y: number,
    z: number
}
export interface RequestProducts {
    originPoint: Point;
    products: [string];
}

export interface ProductPosition {
    positionId: string,
    x: number,
    y: number,
    z: number,
    productId: string,
    quantity: number,
    distanceFromOrigin?: number; // For saving distance from origin
}

export interface ProductPositions {
    [productId: string]: ProductPosition[];
}


export interface PickingOrderItem {
    productId: string;
    positionId: string;
}

export interface PickingOrderResult {
    pickingOrder: PickingOrderItem[];
    distance: number;
}