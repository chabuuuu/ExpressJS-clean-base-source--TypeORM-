import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

export const classValidate = (Dto: any) => async (req: any, res: any, next: any) => {
  try {
    console.log('Request body:', req.body);

    const dtoInstance = plainToInstance(Dto, req.body);
    const validateErrors = await validate(dtoInstance, {
      validationError: { target: false, value: false }
    });
    if (validateErrors.length > 0) {
      const formatError = validateErrors.map((error: any) => Object.values(error.constraints).join(', '));
      throw new BaseError(
        ErrorCode.VALIDATION_ERROR,
        'Your request body is not valid',
        StatusCodes.BAD_REQUEST,
        null,
        formatError
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
