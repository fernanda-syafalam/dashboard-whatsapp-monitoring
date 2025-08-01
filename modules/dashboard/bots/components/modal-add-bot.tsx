import React from 'react';
import { Bots } from './columns';
import { useForm, useWatch } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectDropdown } from '@/components/select-dropdown';
import { Input } from '@/components/ui/input';
import { CorporateListItem, UserRole } from '@/types/list-types';
import { BotSchema, botSchema } from '../schemas/bot.schema';
import { Textarea } from '@/components/ui/textarea';
import { useListCorporate } from '@/hooks/list/use-list-corporate';
import { Button } from '@/components/ui/button';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  currentRow?: Bots;
};

const ModalAddBot = ({ open, onOpenChange, onSubmit, currentRow }: Props) => {
  const isEdit = !!currentRow;
  const corporates = useListCorporate();

  const form = useForm<BotSchema>({
    resolver: zodResolver(botSchema),
    defaultValues: {
      name: '',
      description: '',
      corporateID: ''
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
      <DialogContent>
        <DialogHeader className="sm:max-w-lg">
          <DialogTitle>{isEdit ? 'Edit Bot' : 'Add New Bot'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the bot here.' : 'Create new bot here.'} Click save when you&apos;re done.
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
                          <Input placeholder="WA-08299288432" className="col-span-4" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description ..." className="col-span-4" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="corporateID"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Corporation</FormLabel>
                        <SelectDropdown
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select Corporation"
                          className="col-span-4 "
                          items={
                            corporates.data?.data?.map(({ id, name }) => ({
                              label: name.charAt(0).toUpperCase() + name.slice(1),
                              value: id
                            })) ?? []
                          }
                        />
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
};

export default ModalAddBot;
