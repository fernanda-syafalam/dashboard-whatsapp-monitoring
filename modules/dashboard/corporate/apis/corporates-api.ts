import api from '@/lib/http';
import { Corporates } from '../components/columns';
import { ApiResponseDto, TableParams } from '@/types/api-types';

export type CreateCorporateBody = {
  name: string;
  alias: string;
};

interface FetchCorporatesParams extends TableParams {}

export const corporatesService = {
  fetchCorporates: async (params: FetchCorporatesParams) => {
    const { data } = await api.get<ApiResponseDto<Corporates[]>>(`/corporates`, { params });
    return data;
  },
  createCorporate: async (data: CreateCorporateBody) => {
    return await api.post('/corporates', data);
  },
  updateCorporate: async (id: string, data: CreateCorporateBody) => {
    await api.put(`/corporates/${id}`, data);
  },
  deleteCorporate: async (id: string) => {
    await api.delete(`/corporates/${id}`);
  }
};
