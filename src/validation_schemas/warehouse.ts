import * as yup from 'yup';

const warehouseSchema = yup.object({
    originPoint: yup.object({
        x: yup.number().default(0),
        y: yup.number().default(0),
        z: yup.number().default(0),
    }),
    products: yup.array().of(yup.string()).min(1).required(),
}).required();
export default warehouseSchema;