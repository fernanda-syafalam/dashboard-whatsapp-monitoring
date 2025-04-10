import api from '@/lib/http';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginData = {
  access_token: string;
};
export async function loginApi(body: LoginPayload) {
  return await api.post<LoginData>('auth/login', body);
}

export async function getTest() {
  return await api.get('/users');
}
