import { Role } from "@/models/role.model";
import { IRoleRepository } from "@/repository/interface/i.role.repository";
import { BaseCrudService } from "@/service/base/base.service";
import { IRoleService } from "@/service/interface/i.role.service";
import { ITYPES } from "@/types/interface.types";
import { inject, injectable } from "inversify";

@injectable()
export class RoleService
  extends BaseCrudService<Role>
  implements IRoleService<any>
{
  constructor(@inject("RoleRepository") repository: IRoleRepository<any>) {
    super(repository);
  }
}
