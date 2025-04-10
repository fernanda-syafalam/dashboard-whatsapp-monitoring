import { DataTable } from '@/components/dataTable';
import React from 'react';
import { columnBots, Bots } from './columns';

const data: Bots[] = [
  { id: '1', name: 'John Doe', channel: 'Whatsapp', type: 'private', isActive: true, createdAt: '2023-01-01' },
  {
    id: '2',
    name: 'Jane Doe',
    channel: 'Telegram',
    type: 'public',
    isActive: false,
    createdAt: '2023-01-02'
  }
];

export default function TableBots() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columnBots} data={data} />
    </div>
  );
}
