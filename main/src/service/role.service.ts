import { CreateRoleWithAccountReq } from '@/dto/role/create-role-with-account.req';
import { CreateRoleWithAccountRes } from '@/dto/role/create-role-with-account.res';
import { Account } from '@/models/account.model';
import { Role } from '@/models/role.model';
import { IAccountRepository } from '@/repository/interface/i.account.repository';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IRoleService } from '@/service/interface/i.role.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { id, inject, injectable } from 'inversify';

@injectable()
export class RoleService extends BaseCrudService<Role> implements IRoleService<Role> {
  private roleRepository: IRoleRepository<Role>;

  constructor(@inject('RoleRepository') roleRepository: IRoleRepository<Role>) {
    super(roleRepository);
    this.roleRepository = roleRepository;
  }

  async createWithAccount(payload: { data: CreateRoleWithAccountReq }): Promise<CreateRoleWithAccountRes> {
    const { data } = payload;
    const result = await this.roleRepository.create({
      data: {
        name: data.roleName,
        accounts: data.accountIdList.map((id) => ({ id }))
      }
    });

    const responnse = new CreateRoleWithAccountRes();
    responnse.accountIdList = result.accounts.map((account) => account.id);
    responnse.roleName = result.name;
    responnse.roleId = result.id;
    return responnse;
  }
}
