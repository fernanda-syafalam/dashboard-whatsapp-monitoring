'use client';

import React, { useEffect } from 'react';
import { Corporates, getColumnCorporate,   } from './columns';
import { useUsers } from '../hooks/use-corporate';
import { DataTableRowAction } from '@/types/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAddUser } from '../hooks/use-add-corporate';
import { useActionUser } from '../hooks/use-action-corporate';
import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { DialogAddCorporate } from './corporate-add-dialog';

export default function TableCorporates() {
  const { data } = useUsers();
  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Corporates> | null>(null);
  const columns = getColumnCorporate({ setRowAction });
  const { dialog, isLoading, setDialog, onSubmit } = useAddUser();
  const { handleDeleteUser } = useActionUser();

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    pageCount: data?.pagination?.totalPages || 0,
    initialState: {
      sorting: [{ id: 'createdAt', desc: false }],
      columnPinning: { right: ['actions'] }
    },
    getRowId: originalRow => originalRow.id,
    shallow: false,
    clearOnDefault: true
  });

  return (
    <div className="w-full min-w-full container mx-auto mt-3">
      <div className="mb-5 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="page-header">Corporate</h2>
        </div>
        <div className="flex gap-2">
          <Button className="space-x-1" onClick={() => setDialog(true)}>
            <span>Add</span> <Plus />
          </Button>
        </div>
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>

      <DialogAddCorporate open={dialog} onOpenChange={open => setDialog(open)} onSubmit={onSubmit} />
      <ConfirmationDialog
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        disabled={isLoading}
        onConfirm={() => {
          handleDeleteUser(rowAction?.row.original.id || '');
        }}
      />
    </div>
  );
}
