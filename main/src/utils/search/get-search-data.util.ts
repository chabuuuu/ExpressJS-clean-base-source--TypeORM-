import { SearchDataDto } from '@/dto/search/search-data.dto';
import { SearchFilterReq } from '@/dto/search/search-filter.req';
import { SearchSortReq } from '@/dto/search/search-sort.req';
import { Request } from 'express';

export function getSearchData(req: Request): SearchDataDto {
  const filters: SearchFilterReq[] = req.body.filters ? req.body.filters : [];
  const sorts: SearchSortReq[] = req.body.sorts ? req.body.sorts : [];
  const rpp = parseInt(req.query.rpp as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  return { filters, sorts, rpp, page };
}
