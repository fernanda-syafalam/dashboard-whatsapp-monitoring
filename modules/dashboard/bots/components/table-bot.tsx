'use client';

import React, { useEffect } from 'react';
import { DataTableRowAction } from '@/types/data-table';
import { Bots, getBotTableColumns } from './columns';
import ModalBarcode from './modal-barcode';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useBots } from '../hooks/use-bot';
import ModalAddBot from './modal-add-bot';
import { botService } from '../apis/bot-api';
import { useActionBot } from '../hooks/use-action-bot';
import { ConfirmationDialog } from '@/components/confirmation-dialog';

export default function TableBots() {
  const { data } = useBots(1, 10, 'etst');
  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Bots> | null>(null);
  const columns = getBotTableColumns({ setRowAction });
  const { dialog, isLoading, setDialog, handleSubmitCreate, handleSubmitDelete, handleDisconnect } = useActionBot();

  const { table } = useDataTable({
    data: data ?? [],
    columns: columns,
    pageCount: 0,
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
          <h2 className="page-header">Bots</h2>
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

      <ModalBarcode open={rowAction?.variant === 'scan'} onOpenChange={() => setRowAction(null)} currentRow={rowAction?.row.original} />
      <ModalAddBot
        open={dialog}
        onOpenChange={(open: boolean) => setDialog(open)}
        onSubmit={handleSubmitCreate}
        currentRow={rowAction?.row.original}
      />

      <ConfirmationDialog
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        onConfirm={() => handleSubmitDelete(rowAction?.row.original.id || '')}
        disabled={isLoading}
      />

      <ConfirmationDialog
        open={rowAction?.variant === 'disconnect'}
        onOpenChange={() => setRowAction(null)}
        onConfirm={() => handleDisconnect(rowAction?.row.original.id || '')}
        disabled={isLoading}
        title="Disconnect Bot"
        description="Are you sure you want to disconnect this bot? This action cannot be undone."
        confirmLabel="Disconnect"
        cancelLabel="Cancel"
      />
    </div>
  );
}
