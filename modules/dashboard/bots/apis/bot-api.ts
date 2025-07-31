import api from '@/lib/http';
import { Bots } from '../components/columns';

type GetAllRequest = {
  page: number;
  limit: number;
  corporateID: string;
};

type GetAllResponse = {
  data: Bots[];
};

type GenerateQrResponse = {
  qrCode: string;
};

type CreateBotRequestBody = {
  name: string;
  description: string;
  corporateID: string;
}

export const botService = {
  async getBots(params: GetAllRequest) {
    const { data } = await api.get<GetAllResponse>('/bots', { params });
    return data.data;
  },
  async getGeneratedBarcode(id: string) {
    const { data } = await api.post<GenerateQrResponse>('/whatsapp/generate-qr', { deviceID: id });
    return data;
  },
  async create(data: CreateBotRequestBody) {
    return await api.post('/bots', data);
  },
  async update(id: string, data: CreateBotRequestBody) {
    await api.put(`/bots/${id}`, data);
  },
  async delete(id: string) {
    await api.delete(`/bots/${id}`);
  },
  async disconnect(id: string) {
    await api.post(`/whatsapp/disconnect/`, { data: { deviceID: id } });
  }
};
