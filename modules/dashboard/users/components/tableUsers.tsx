'use client';

import { DataTable } from '@/components/dataTable';
import React from 'react';
import { columnUsers, Users } from './columns';
import { useUsers } from '../hooks/useUsers';
export default function TableUsers() {
  const { data } = useUsers(1);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columnUsers} data={data || []} />
    </div>
  );
}
