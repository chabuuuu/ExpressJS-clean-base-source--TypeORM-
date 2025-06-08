import { PagingDto } from '@/dto/paging.dto';
import { SearchDataDto } from '@/dto/search/search-data.dto';
import { SearchOperator } from '@/enums/search-operator.enum';
import { RecordOrderType } from '@/types/record-order.types';
import { stringNormalize } from '@/utils/string-normalize.util';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual
} from 'typeorm';

export class SearchUtil {
  static createWhereCondition(key: string, value: any): any {
    const whereCondition: any = {};
    const keys = key.split('.');

    if (keys.length === 1) {
      return { [key]: value };
    }

    let temp = whereCondition;
    for (let i = 0; i < keys.length - 1; i++) {
      temp[keys[i]] = {};
      temp = temp[keys[i]];
    }
    temp[keys[keys.length - 1]] = value;

    return whereCondition;
  }

  static getWhereCondition(searchData: SearchDataDto): {
    where: FindOptionsWhere<any>;
    order: RecordOrderType[];
    paging: PagingDto;
  } {
    const whereConditions: FindOptionsWhere<any> = {};

    const { filters, sorts, rpp, page } = searchData;

    filters.forEach((filter) => {
      const key = filter.key as any;
      switch (filter.operator) {
        case SearchOperator.equal:
          {
            const getEqualCondition = this.createWhereCondition(key, filter.value as any);
            Object.assign(whereConditions, getEqualCondition);
          }
          break;
        case SearchOperator.like:
          {
            // If filter.key is slug
            if (filter.key === 'slug') {
              // Format slug
              filter.value = stringNormalize(filter.value);
              const getLikeCondition = this.createWhereCondition(key, Like(`%${filter.value}%`) as any);
              Object.assign(whereConditions, getLikeCondition);
            } else {
              const getLikeCondition = this.createWhereCondition(key, Like(`%${filter.value}%`) as any);
              Object.assign(whereConditions, getLikeCondition);
            }
          }
          break;
        case SearchOperator.range:
          {
            const [min, max] = filter.value.split('-').map(Number);
            const getRangeCondition = this.createWhereCondition(key, Between(min, max) as any);
            Object.assign(whereConditions, getRangeCondition);
          }
          break;
        case SearchOperator.greater:
          {
            const getGreaterCondition = this.createWhereCondition(key, MoreThan(filter.value) as any);
            Object.assign(whereConditions, getGreaterCondition);
          }
          break;
        case SearchOperator.greater_equal:
          {
            const getGreaterEqualCondition = this.createWhereCondition(key, MoreThanOrEqual(filter.value) as any);
            Object.assign(whereConditions, getGreaterEqualCondition);
          }
          break;
        case SearchOperator.less:
          {
            const getLessCondition = this.createWhereCondition(key, LessThan(filter.value) as any);
            Object.assign(whereConditions, getLessCondition);
          }
          break;
        case SearchOperator.less_equal:
          {
            const getLessEqualCondition = this.createWhereCondition(key, LessThanOrEqual(filter.value) as any);
            Object.assign(whereConditions, getLessEqualCondition);
          }
          break;
        case SearchOperator.in:
          {
            //Convert json string to array
            const arrayValue = filter.value.split(',');

            const getInCondition = this.createWhereCondition(key, In(arrayValue) as any);
            Object.assign(whereConditions, getInCondition);
          }
          break;
        default:
          break;
      }
    });

    // Build order
    const order = new Array<RecordOrderType>();

    sorts.forEach((sortItem) => {
      const key = sortItem.key as any;
      order.push({
        column: key,
        direction: sortItem.type
      });
    });

    const paging = new PagingDto(page, rpp);

    return { where: whereConditions, order, paging };
  }
}
