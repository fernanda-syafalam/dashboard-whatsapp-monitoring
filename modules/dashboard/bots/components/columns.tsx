'use client';

import { DataTableColumnHeader } from '@/components/table/dataTableColumnHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CircleSlash, Trash2 } from 'lucide-react';
import { BsQrCodeScan } from 'react-icons/bs';
import { AiOutlineDisconnect } from 'react-icons/ai';
import { DataTableRowAction } from '@/types/data-table';

export type Bots = {
  id: string;
  name: string;
  corporateName: string;
  description: string;
  isActive: boolean;
  createdAt: string;
};

interface GetBotsTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Bots> | null>>;
}

export function getBotTableColumns({ setRowAction }: GetBotsTableColumnsProps): ColumnDef<Bots>[] {
  return [
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
      ),
      size: 25
    },
    {
      accessorKey: 'id',
      header: 'ID',
      enableSorting: true,
      cell: ({ row }) => <span>{row.index + 1}</span>,
      size: 25
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" hidden={true} />,
      size: 100
    },
    {
      accessorKey: 'corporateName',
      header: 'Corporate Name',
      size: 150
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 200
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
      header: 'Created At',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <span>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>;
      },
      size: 50
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <div className="flex items-center gap-2">
            {!isActive ? (
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setRowAction({ variant: 'scan', row })}>
                <BsQrCodeScan />
              </Button>
            ) : (
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setRowAction({ variant: 'disconnect', row })}>
                <AiOutlineDisconnect />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-800"
              onClick={() => setRowAction({ variant: 'delete', row })}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
      size: 50
    }
  ];
}
