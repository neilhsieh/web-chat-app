import { RequestHandler } from 'express';

export const middlewareLogger: RequestHandler = (_req, _res, next) => {
  // console.log('Getting url', req.url);
  next();
};

