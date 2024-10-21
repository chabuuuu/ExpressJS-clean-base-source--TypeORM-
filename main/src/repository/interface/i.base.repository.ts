import { PagingDto } from '@/dto/paging.dto';
import { DeleteResultType } from '@/types/delete-result.types';
import { RecordOrderType } from '@/types/record-order.types';
import { UpdateResultType } from '@/types/update-result.types';
import { DeepPartial, FindOptionsSelect } from 'typeorm';

export interface IBaseRepository<T> {
  /**
   * Save a record
   * @param data
   * @returns The saved record
   */
  save(data: T): Promise<T>;

  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  create(payload: { data: DeepPartial<T> }): Promise<T>;

  /**
   * Find a record by the given filter and delete it
   * @param filter
   * @returns The deleted record
   */
  findOneAndDelete(options: { filter: Partial<T> }): Promise<void>;

  /**
   * Find a record by the given filter and update it
   * @param filter
   * @param updateData
   * @returns The updated success message
   */
  findOneAndUpdate(options: { filter: Partial<T>; updateData: Partial<T> }): Promise<void>;

  /**
   * Finds a single entity that matches the given filter options.
   *
   * @param options - The options to filter the entity.
   * @param options.filter - Partial object to filter the entity.
   * @param options.relations - Optional array of relations to include.
   * @param options.select - Optional fields to select.
   * @returns A promise that resolves to the found entity or null if no entity matches the filter.
   */
  findOne(options: { filter: Partial<T>; relations?: string[]; select?: FindOptionsSelect<T> }): Promise<T | null>;

  /**
   * Find all records by the given filter
   * @param filter The filter to find records
   * @param paging The paging options
   * @param order The order options
   * @param relations The relations to include
   * @param select The select options
   * @returns The records with given filter
   */
  findMany(options: {
    filter?: Partial<T>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
    select?: FindOptionsSelect<T>;
  }): Promise<T[]>;

  /**
   * Find all records
   */
  findAll(): Promise<T[]>;

  /**
   * Count records by the given filter
   * @param filter
   * @returns The number of records with given filter
   */
  count(options: { filter?: Partial<T> }): Promise<number>;

  /**
   * Check if a record exists with the given filter
   * @param filter
   */
  exists(options: { filter: Partial<T> }): Promise<boolean>;
}
