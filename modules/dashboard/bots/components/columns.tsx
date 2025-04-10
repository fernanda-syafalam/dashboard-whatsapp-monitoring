'use client';

import { DataTableColumnHeader } from '@/components/table/dataTableColumnHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowUpDown, Check, CircleSlash, LockIcon, LockOpenIcon, Phone } from 'lucide-react';

export type Bots = {
  id: string;
  name: string;
  channel: 'Whatsapp' | 'Telegram' | 'Email' | 'SMS';
  type: 'public' | 'private';
  isActive: boolean;
  createdAt: string;
};

export const columnBots: ColumnDef<Bots>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />
    )
  },
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" hidden={true} />
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => {
      const channel = row.original.channel;
      return <span className="capitalize">{channel}</span>;
    }
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div
          className={clsx(
            'flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium w-fit transition-colors duration-300',
            type === 'private' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-300'
          )}
        >
          {type === 'private' ? <LockIcon className="h-4 w-4 text-blue-600" /> : <LockOpenIcon className="h-4 w-4 text-gray-600" />}
          <span className="capitalize">{type}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <span className="capitalize flex items-center">
          {isActive && <Check className="mr-1 h-4 w-4 text-green-600" />}
          {!isActive && <CircleSlash className="mr-1 h-4 w-4 text-red-500" />}
        </span>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  }
];
