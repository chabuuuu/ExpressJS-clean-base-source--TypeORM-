import { Account } from '@/models/account.model';
import { IAccountRepository } from '@/repository/interface/i.account.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IAccountService } from '@/service/interface/i.account.service';
import { inject, injectable } from 'inversify';

@injectable()
export class AccountService extends BaseCrudService<Account> implements IAccountService<Account> {
  private accountRepository: IAccountRepository<Account>;

  constructor(@inject('AccountRepository') accountRepository: IAccountRepository<Account>) {
    super(accountRepository);
    this.accountRepository = accountRepository;
  }
}
