import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CreateRoleWithAccountReq } from '@/dto/role/create-role-with-account.req';
import { CreateRoleWithAccountRes } from '@/dto/role/create-role-with-account.res';
import { Role } from '@/models/role.model';
import { IRoleService } from '@/service/interface/i.role.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class RoleController {
  public common: IBaseCrudController<Role>;
  private roleService: IRoleService<Role>;
  constructor(
    @inject('RoleService') roleService: IRoleService<Role>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Role>
  ) {
    this.roleService = roleService;
    this.common = common;
  }

  /**
   * * POST /api/role/with-account
   * @param req
   * @param res
   * @param next
   */
  async createWithAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody: CreateRoleWithAccountReq = req.body;
      const result: CreateRoleWithAccountRes = await this.roleService.createWithAccount({
        data: requestBody
      });
      res.send_ok('Create new role with account successful', result);
    } catch (error) {
      next(error);
    }
  }
}
