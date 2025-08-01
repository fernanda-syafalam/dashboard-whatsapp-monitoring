'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Corporates } from './columns';
import { formSchema, CorporateSchema } from '../schemas/corporate.schema';

interface Props {
  currentRow?: Corporates;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CorporateSchema) => void;
}

export function DialogAddCorporate({ currentRow, open, onOpenChange, onSubmit }: Props) {
  const isEdit = !!currentRow;

  const form = useForm<CorporateSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      alias: ''
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={state => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            {(() => {
              return (
                <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" className="col-span-4" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alias"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Alias</FormLabel>
                        <FormControl>
                          <Input placeholder="INDODAX" className="col-span-4" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                </form>
              );
            })()}
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
