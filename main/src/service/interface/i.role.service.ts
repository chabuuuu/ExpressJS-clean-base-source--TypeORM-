import { CreateRoleWithAccountReq } from '@/dto/role/create-role-with-account.req';
import { CreateRoleWithAccountRes } from '@/dto/role/create-role-with-account.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-moedl.types';

export interface IRoleService<T extends BaseModelType> extends IBaseCrudService<T> {
  createWithAccount(payload: { data: CreateRoleWithAccountReq }): Promise<CreateRoleWithAccountRes>;
}
