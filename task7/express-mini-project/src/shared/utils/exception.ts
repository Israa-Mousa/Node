import type { Response } from 'express';
import { ModuleNameType } from './constant';
import { ErrorStatusCode} from './util.types';
export class CustomError extends Error {
  public errorType = 'custom';
  constructor(
    msg: string,
    public moduleName: ModuleNameType,
    public statusCode: ErrorStatusCode
  ) {
    super(msg);
  }
}

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    console.log('customError', error);
    res.status(error.statusCode).send(error.message);
    return;
  }
  //   we should alert ourself
  console.error('unexpected error', error);
  res.status(500).send('internal server');
};
