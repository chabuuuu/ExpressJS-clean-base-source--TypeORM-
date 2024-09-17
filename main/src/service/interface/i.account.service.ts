import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-moedl.types';

export interface IAccountService<T extends BaseModelType> extends IBaseCrudService<T> {}
