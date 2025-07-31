'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectDropdown } from '@/components/select-dropdown';
import { UserRole } from '@/types/list-types';
import { Users } from './columns';
import { formSchema, UserSchema } from '../schemas/user.schema';
import { useListUserRole } from '@/hooks/list/use-list-user-role';

interface Props {
  currentRow?: Users;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UserSchema) => void;
}

export function UsersAddDialog({ currentRow, open, onOpenChange, onSubmit }: Props) {
  const isEdit = !!currentRow;
  const userRoles = useListUserRole();

  const form = useForm<UserSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: ''
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
              const role = useWatch({ control: form.control, name: 'role' });

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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@gmail.com" className="col-span-4" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe123"
                            className="col-span-4"
                            type="password"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                        <FormLabel className="col-span-2 text-right">Role</FormLabel>
                        <SelectDropdown
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select a role"
                          className="col-span-4 "
                          items={
                            userRoles.data?.data && Array.isArray(userRoles.data?.data)
                              ? userRoles.data?.data.map((item: UserRole) => ({
                                  label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                                  value: item.id
                                }))
                              : [] 
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
}

