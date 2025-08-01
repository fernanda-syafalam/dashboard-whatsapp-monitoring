import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableRowAction } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CircleSlash, Pen, Pencil, Trash2 } from 'lucide-react';

export type Corporates = {
  id: string;
  name: string;
  alias: string;
  totalBots: string;
  totalUsers: string;
  createdAt: string;
};

interface GetTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Corporates> | null>>;
}

export function getColumnCorporate({ setRowAction }: GetTableColumnsProps): ColumnDef<Corporates>[] {
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
      enableSorting: false,
      size: 25
    },
    {
      accessorKey: 'id',
      header: 'ID',
      enableSorting: false,
      cell: ({ row }) => <span>{row.index + 1}</span>,
      size: 25
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200
    },
    {
      accessorKey: 'alias',
      header: 'Alias',
      size: 200
    },
    {
      accessorKey: 'totalBots',
      header: ({ column }) => <DataTableColumnHeader column={column} className="flex justify-center p-0" title="Total Bots" />,
      cell: ({ row }) => {
        return <div className="flex justify-center">{row.getValue('totalBots')}</div>;
      },
      enableSorting: false,
      size: 100,
   
    },
    {
      accessorKey: 'totalUsers',
      header: ({ column }) => <DataTableColumnHeader column={column} className="flex justify-center p-0" title="Total Users" />,
      cell: ({ row }) => {
        return <div className="flex justify-center">{row.getValue('totalUsers')}</div>;
      },
      enableSorting: false,
      size: 100,
      enablePinning: true,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <span>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>;
      },
      size: 150
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setRowAction({ variant: 'update', row })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-800"
            onClick={() => setRowAction({ variant: 'delete', row })}
          >
            <Trash2 />
          </Button>
        </div>
      ),
      size: 100
    }
  ];
}
