import { StatusCodes } from 'http-status-codes';

export interface ErrorCodeType {
  code: string;
  message: string;
  httpStatus: StatusCodes;
}
