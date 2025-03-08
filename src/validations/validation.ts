import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * 
 * @param schema 
 * @param property
 */
const validate =
  (schema: Joi.Schema, property: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const options: Joi.ValidationOptions = {
      abortEarly: false,
      allowUnknown: false,
      errors: { wrap: { label: false } },
    };

    const { error, value } = schema.validate(req[property], options);

    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    req[property] = value; 
    next();
  };

export default validate;
