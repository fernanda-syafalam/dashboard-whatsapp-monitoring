import api from '@/lib/http';
import { ApiResponseDto } from '@/types/api-types';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginData = {
  accessToken: string;
};

export async function loginApi(body: LoginPayload) {
  const { data } = await api.post<ApiResponseDto<LoginData>>('auth/login', body);
  return data;
}

export async function getTest() {
  return await api.get('/users');
}
