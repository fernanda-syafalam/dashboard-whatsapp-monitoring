import {  parseSort, parseCreatedAtToDateRange } from '@/lib/parsers';
import { Sort } from '@/types/api-types';
import { useQueryState, parseAsInteger, parseAsArrayOf, parseAsString } from 'nuqs';
import { z } from 'zod';

export const useParamsTable = <T>() => {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [isActive] = useQueryState('isActive', parseAsArrayOf(parseAsString));
  const [createdAt] = useQueryState('createdAt', parseAsArrayOf(z.coerce.number()).withDefault([]));
  const [searchQuery] = useQueryState('searchQuery', parseAsString.withDefault(''));
  const [searchBy] = useQueryState('searchBy', parseAsString.withDefault(''));
  const [sortParams] = useQueryState(
    'sort',
    parseAsArrayOf(z.object({ id: z.string(), desc: z.boolean() })).withDefault([{ id: 'createdAt', desc: false }])
  );

  const sort: Sort[] = parseSort(sortParams);
  const status = isActive ? isActive[0] : null;
  const { startDate, endDate } = parseCreatedAtToDateRange(createdAt);

  return {
    page,
    perPage,
    isActive: status,
    sort,
    startDate,
    endDate,
    searchBy,
    searchQuery
  };
};
