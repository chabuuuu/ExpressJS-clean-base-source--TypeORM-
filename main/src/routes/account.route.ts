import { accountController } from '@/container/account.container';
import { CreateAccountReq } from '@/dto/account/create-account.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const accountRouter = express.Router();
accountRouter
  .post('/', classValidate(CreateAccountReq), accountController.create.bind(accountController))

  .get('/paging', accountController.common.findWithPaging.bind(accountController.common))

  .get('/:id', accountController.findOne.bind(accountController))

  .get('/', accountController.common.findAll.bind(accountController.common));

export default accountRouter;
