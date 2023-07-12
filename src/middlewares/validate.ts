import {Request, Response, NextFunction} from "express";
import * as yup from 'yup';
const validate = (schema: yup.ObjectSchema<any> | yup.ArraySchema<any, any, any, any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err: any) {
        return res.status(500).json({ type: err.name, message: err.message });
    }
};

export default validate;