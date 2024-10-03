import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils';
import mongoose from 'mongoose';

export const validateShortenUrl = [
  body('url').isURL().withMessage('Provide a valid URL'),
  body('customName')
    .optional()
    .isLength({ min: 5 })
    .withMessage('Custom name must be at least 5 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = errors
        .array()
        .map((e) => e.msg)
        .join('. ');
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: errMsg });
    }
    next();
  }
];

export const validateUrlLength = [
  body("customName").optional().isLength({ min: 5 })
  .withMessage('Custom name must be at least 5 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = errors
        .array()
        .map((e) => e.msg)
        .join('. ');
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: errMsg });
    }
    next();
  }
]

export const validateUrl = [
  body('url').optional().isURL().withMessage('Provide a valid URL'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = errors
        .array()
        .map((e) => e.msg)
        .join('. ');
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: errMsg });
    }
    next();
  }
];

export const validateId = [
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST.code).send({ message: 'Provide a valid URL ID' });
    }
    next();
  }
];
