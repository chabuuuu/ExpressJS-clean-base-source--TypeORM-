import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Page } from '@/types/page.types';
import { RecordOrderType } from '@/types/record-order.types';
import { DeepPartial, FindOptionsSelect } from 'typeorm';

export interface IBaseCrudService<MODEL> {
  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  create(payload: { data: DeepPartial<MODEL> }): Promise<MODEL>;

  /**
   * Find a record by the given filter and delete it
   * @param filter The filter to find the record
   * @returns The deleted record
   */
  findOneAndDelete(options: { filter: Partial<MODEL> }): Promise<void>;

  /**
   * Find a record by the given filter and update it
   * @param filter The filter to find the record
   * @param updateData The data to update the record
   * @returns The updated success message
   */
  findOneAndUpdate(options: { filter: Partial<MODEL>; updateData: Partial<MODEL> }): Promise<void>;

  /**
   * Find all records
   */
  findAll(): Promise<MODEL[]>;

  /**
   * Find all records by the given filter
   * @param filter The filter to find records
   * @param paging  The paging options
   * @param order The order options
   * @param relations The relations to include
   * @param select The select options
   * @returns The records with given filter
   */
  findMany(options: {
    filter?: Partial<MODEL>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
    select?: FindOptionsSelect<MODEL>;
  }): Promise<MODEL[]>;

  /**
   * Find a record by the given filter
   * @param filter The filter to find the record
   * @param relations The relations to include
   * @param select The select options
   * @returns The record with given filter
   */
  findOne(options: {
    filter: Partial<MODEL>;
    relations?: string[];
    select?: FindOptionsSelect<MODEL>;
  }): Promise<MODEL | null>;

  /**
   * Find all records by the given filter with paging
   * @param filter
   * @returns The records with given filter
   */
  findWithPaging(options: {
    filter?: Partial<MODEL>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
    select?: FindOptionsSelect<MODEL>;
  }): Promise<PagingResponseDto<MODEL>>;

  /**
   * Find all with paging and order
   * @param paging The paging options
   * @param order The order options
   * @returns MODEL[] with paging and order
   */
  findAllWithPagingAndOrder(options: { paging: PagingDto; order: RecordOrderType }): Promise<PagingResponseDto<MODEL>>;

  /**
   * Find all with paging
   * @param paging The paging options
   * @param select The select options
   * @param relations The relations to include
   * @returns MODEL[] with paging
   */
  findAllWithPaging(options: {
    paging: PagingDto;
    select?: FindOptionsSelect<MODEL>;
    relations?: string[];
  }): Promise<PagingResponseDto<MODEL>>;

  /**
   * Count records by the given filter
   * @param filter The filter to count records
   * @returns The number of records with given filter
   */
  count(options: { filter?: Partial<MODEL> }): Promise<number>;

  /**
   * Check if a record exists with the given filter
   * @param filter The filter to check if record exists
   * @returns True if record exists, false otherwise
   */
  exists(options: { filter: Partial<MODEL> }): Promise<boolean>;
}
