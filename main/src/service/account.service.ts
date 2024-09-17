import { Account } from '@/models/account.model';
import { IAccountRepository } from '@/repository/interface/i.account.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IAccountService } from '@/service/interface/i.account.service';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';

@injectable()
export class AccountService extends BaseCrudService<Account> implements IAccountService<Account> {
  constructor(@inject('AccountRepository') repository: IAccountRepository<Account>) {
    super(repository);
  }
}
