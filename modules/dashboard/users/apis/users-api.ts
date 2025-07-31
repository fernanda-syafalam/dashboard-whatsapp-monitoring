import api from '@/lib/http';
import { Users } from '../components/columns';
import { ApiResponseDto, TableParams } from '@/types/api-types';

export type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

interface FetchUsersParams extends TableParams {}

export const usersService = {
  fetchUsers: async (params: FetchUsersParams) => {
    const { data } = await api.get<ApiResponseDto<Users[]>>(`/users`, { params });
    console.log('fetchUsers', data);
    return data;
  },
  createUser: async (data: CreateUserBody) => {
    return await api.post('/users', data);
  },
  updateUser: async (id: string, data: CreateUserBody) => {
    await api.put(`/users/${id}`, data);
  },
  deleteUser: async (id: string) => {
    await api.delete(`/users/${id}`);
  }
};
