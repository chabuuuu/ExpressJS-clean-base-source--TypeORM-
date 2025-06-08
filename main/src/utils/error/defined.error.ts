import { ErrorCodeType } from '@/exceptions/error-code-type';
import { StatusCodes } from 'http-status-codes';

class DefinedError extends Error {
  public code: string;
  public msg: string;
  public data?: any;
  public httpStatus?: StatusCodes;

  /**
   * Generate a new instance of BaseException
   * @param code
   * @param msg
   * @param data
   */
  constructor(error: ErrorCodeType) {
    super(error.message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = error.code;
    this.msg = error.message;
    this.httpStatus = error.httpStatus;
    Error.captureStackTrace(this);
  }
}
export default DefinedError;
