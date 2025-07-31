import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableRowAction } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CircleSlash, Pen, Pencil, Trash2 } from 'lucide-react';

export type Users = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

interface GetTableColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Users> | null>>;
}

export function getColumnUsers({ setRowAction }: GetTableColumnsProps): ColumnDef<Users>[] {
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
      size: 25,
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
      header: 'Name',
      size: 200
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.original.role;
        return <span className="capitalize">{role}</span>;
      },
      size: 100
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
      },
      size: 100,
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
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setRowAction({ variant: 'update', row })}
          >
            <Pencil />
          </Button> */}
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
      size: 50
    }
  ];
}
