import api from '@/lib/http';
import { ApiResponseDto } from '@/types/api-types';
import { CorporateListItem, UserRole } from '@/types/list-types';


interface ResponseListCorporate {
  items: CorporateListItem[];
}

export const listService = {
  fetchCorporate: async () => {
    const { data } = await api.get<ApiResponseDto<ResponseListCorporate>>('/corporate/list');
    return data;
  },
  fetchUserRole: async () => {
    const { data } = await api.get<ApiResponseDto<UserRole>>('/users/roles');
    return data;
  }
};
