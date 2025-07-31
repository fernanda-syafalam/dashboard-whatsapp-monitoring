'use client';

import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginApi } from '../apis/loginApi';
import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';

export function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const { setToken } = useAuthStore();

  const onSubmit = async (loginData: LoginSchema) => {
    const { data } = await loginApi(loginData);
    if (data?.accessToken) {
      setToken(data.accessToken);
      const token = useAuthStore.getState().token;
      if (token !== data.accessToken) {
        console.warn('Access token mismatch!');
      }

      redirect('/dashboard');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  };
}
