import {Point, ProductPosition, ProductPositions} from "../src/models/warehouse";
import {
    calculateDistanceBetweenTwoPoints, calculateDistanceFromOrigin, calculateTotalDistance, createPickingOrder,
    getProductPositions, onlyInStock,
    sortByDistanceFromOrigin
} from "../src/services/warehouseService";
import axios from "axios";

jest.mock('axios');

describe("warehouseService unit tests", () => {

    test("calculateDistanceBetweenTwoPoints function", () => {
        const pointA: Point = { x: 1, y: 2, z: 3 };
        const pointB: Point = { x: 4, y: 5, z: 6 };
        const result = calculateDistanceBetweenTwoPoints(pointA, pointB);
        expect(result).toBeCloseTo(5.196);
    });

    test("calculateTotalDistance function", () => {
        const positions: ProductPosition[] = [
            { positionId: 'position-241', x: 3, y: 12, z: 0, productId: 'product-2', quantity: 12 },
            { positionId: 'position-245', x: 15, y: 12, z: 0, productId: 'product-2', quantity: 5 },
            { positionId: 'position-234', x: 72, y: 11, z: 0, productId: 'product-2', quantity: 12 },
        ];
        const result = calculateTotalDistance(positions);
        expect(result).toBeCloseTo(69, 0);
    });

    test("onlyInStock function", () => {
        const positions: ProductPosition[] = [
            { positionId: 'position-241', x: 3, y: 12, z: 0, productId: 'product-2', quantity: 0 },
            { positionId: 'position-245', x: 15, y: 12, z: 0, productId: 'product-2', quantity: 5 },
            { positionId: 'position-234', x: 72, y: 11, z: 0, productId: 'product-2', quantity: 12 },
        ];
        const result = onlyInStock(positions);
        expect(result.length).toBe(2);
    });

    test("calculateDistanceFromOrigin function", () => {
        const position: ProductPosition = { positionId: 'position-241', x: 3, y: 12, z: 0, productId: 'product-2', quantity: 12 };
        const origin: Point = { x: 0, y: 0, z: 0 };
        const result = calculateDistanceFromOrigin(position, origin);
        expect(result.distanceFromOrigin).toBeCloseTo(12, 0);
    });

    test("sortByDistanceFromOrigin function", () => {
        const positions: ProductPosition[] = [
            { positionId: 'position-241', x: 3, y: 12, z: 0, productId: 'product-2', quantity: 12 },
            { positionId: 'position-245', x: 15, y: 12, z: 0, productId: 'product-2', quantity: 5 },
            { positionId: 'position-234', x: 72, y: 11, z: 0, productId: 'product-2', quantity: 12 },
        ];
        const origin: Point = { x: 0, y: 0, z: 0 };
        const result = sortByDistanceFromOrigin(positions, origin);
        expect(result[0].positionId).toBe('position-241');
    });

    test("createPickingOrder function", () => {
        const positions: ProductPositions = {
            'product-2': [
                { positionId: 'position-241', x: 3, y: 12, z: 0, productId: 'product-2', quantity: 12, distanceFromOrigin: 12.36931687685298 },
                { positionId: 'position-245', x: 15, y: 12, z: 0, productId: 'product-2', quantity: 5, distanceFromOrigin: 19.209372712298546 },
                { positionId: 'position-234', x: 72, y: 11, z: 0, productId: 'product-2', quantity: 12, distanceFromOrigin: 72.83543093852057 },
            ],
            'product-1': [
                { positionId: 'position-31', x: 3, y: 1, z: 0, productId: 'product-1', quantity: 13, distanceFromOrigin: 3.1622776601683795 },
                { positionId: 'position-175', x: 75, y: 7, z: 0, productId: 'product-1', quantity: 9, distanceFromOrigin: 75.32595834106593 },
                { positionId: 'position-397', x: 21, y: 6, z: 100, productId: 'product-1', quantity: 6, distanceFromOrigin: 102.35721762533407 },
                { positionId: 'position-458', x: 24, y: 10, z: 100, productId: 'product-1', quantity: 10, distanceFromOrigin: 103.32473082471591 },
                { positionId: 'position-282', x: 36, y: 0, z: 100, productId: 'product-1', quantity: 12, distanceFromOrigin: 106.28264204469139 },
                { positionId: 'position-404', x: 42, y: 6, z: 100, productId: 'product-1', quantity: 16, distanceFromOrigin: 108.62780491200216 },
                { positionId: 'position-449', x: 87, y: 7, z: 100, productId: 'product-1', quantity: 4, distanceFromOrigin: 132.7328143301422 }
            ],
            'product-4': [
                { positionId: 'position-120', x: 0, y: 6, z: 0, productId: 'product-4', quantity: 9, distanceFromOrigin: 6 },
                { positionId: 'position-260', x: 60, y: 12, z: 0, productId: 'product-4', quantity: 7, distanceFromOrigin: 61.18823416311342 },
                { positionId: 'position-232', x: 66, y: 11, z: 0, productId: 'product-4', quantity: 14, distanceFromOrigin: 66.91038783328041 },
                { positionId: 'position-630', x: 0, y: 5, z: 200, productId: 'product-4', quantity: 3, distanceFromOrigin: 200.06249023742558 },
                { positionId: 'position-591', x: 63, y: 1, z: 200, productId: 'product-4', quantity: 16, distanceFromOrigin: 209.69024774652732 }
            ],
            'product-3': [
                { positionId: 'position-124', x: 12, y: 6, z: 0, productId: 'product-3', quantity: 9, distanceFromOrigin: 13.416407864998739 },
                { positionId: 'position-201', x: 63, y: 10, z: 0, productId: 'product-3', quantity: 8, distanceFromOrigin: 63.788713735268246 },
                { positionId: 'position-342', x: 36, y: 2, z: 100, productId: 'product-3', quantity: 6, distanceFromOrigin: 106.30145812734649 },
                { positionId: 'position-373', x: 39, y: 5, z: 100, productId: 'product-3', quantity: 13, distanceFromOrigin: 107.45231500530828 },
                { positionId: 'position-632', x: 6, y: 5, z: 200, productId: 'product-3', quantity: 15, distanceFromOrigin: 200.15244190366502 },
                { positionId: 'position-720', x: 0, y: 10, z: 200, productId: 'product-3', quantity: 9, distanceFromOrigin: 200.24984394500785 },
                { positionId: 'position-616', x: 48, y: 2, z: 200, productId: 'product-3', quantity: 8, distanceFromOrigin: 206.82788299017767 },
                { positionId: 'position-707', x: 92, y: 4, z: 200, productId: 'product-3', quantity: 11, distanceFromOrigin: 223.05140447414236 }
            ]
        };
        const result = createPickingOrder(positions);
        expect(result.distance).toBeCloseTo(27, 0);
        expect(result.pickingOrder[0].productId).toStrictEqual('product-1');
        expect(result.pickingOrder[1].productId).toStrictEqual('product-4');
        expect(result.pickingOrder[2].productId).toStrictEqual('product-2');
        expect(result.pickingOrder[3].productId).toStrictEqual('product-3');
    });

    test("getProductPositions function", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const product = 'product-2';
        const positions: ProductPosition[] = [
            {
                "positionId": "position-241",
                "x": 3,
                "y": 12,
                "z": 0,
                "productId": "product-2",
                "quantity": 12
            },
            {
                "positionId": "position-245",
                "x": 15,
                "y": 12,
                "z": 0,
                "productId": "product-2",
                "quantity": 5
            },
            {
                "positionId": "position-234",
                "x": 72,
                "y": 11,
                "z": 0,
                "productId": "product-2",
                "quantity": 12
            }
        ];
        mockedAxios.get.mockResolvedValueOnce({ status: 200, data: positions });
        const result = await getProductPositions(product);
        expect(result).toEqual(positions);
    });

});