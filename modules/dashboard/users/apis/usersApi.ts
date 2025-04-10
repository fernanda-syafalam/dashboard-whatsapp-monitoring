import api from '@/lib/http';
import { Users } from '../components/columns';

export type data = {
    data: Users[]
}

export const usersService = {
  fetchUsers: async (page: number) => {
    const { data } = await api.get<data>(`/users?page=${page}`);
    return data.data;
  },
  createUser: async (name: string, email: string) => {
    await api.post('/users', { name, email });
  },
  updateUser: async (id: string, name: string, email: string) => {
    await api.put(`/users/${id}`, { name, email });
  },
  deleteUser: async (id: string) => {
    await api.delete(`/users/${id}`);
  }
};
