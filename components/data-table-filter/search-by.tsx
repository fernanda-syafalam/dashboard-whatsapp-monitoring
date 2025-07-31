'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Search } from 'lucide-react';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Table } from '@tanstack/react-table';
import { parseAsString, useQueryState } from 'nuqs';

interface SearchByProps<TData> {
  table: Table<TData>;
  options: SearchByOptions[];
}

export type SearchByOptions = {
  label: string;
  value: string;
};

function SearchBy<TData>({ options, table }: SearchByProps<TData>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryState('searchQuery', parseAsString.withDefault(''));
  const [searchBy, setSearchBy] = useQueryState('searchBy', parseAsString.withDefault(''));
  const [searchValue, setSearchValue] = useState(searchQuery);
  const filteredOptions = options.filter(option => option.value === searchBy);
  const [selectedOption, setSelectedOption] = useState<SearchByOptions>(filteredOptions[0] ?? options[0]);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearchQuery(searchValue);
      setSearchBy(selectedOption.value);
      if (searchValue.trim() === '') {
        table.setColumnFilters(prevFilters => prevFilters.filter(filter => filter.id !== selectedOption.value));
      } else {
        table.setColumnFilters([
          {
            id: selectedOption.value,
            value: searchValue
          }
        ]);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchValue, selectedOption, setSearchBy, setSearchQuery, table]);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchBy, searchQuery]);

  useEffect(() => {
    if (table.getState().columnFilters.length === 0) {
      setSearchValue('');
    }
  }, [table]);

  const handleSelect = (option: SearchByOptions) => {
    setSelectedOption(option);
    setOpen(false);
  };

  return (
    <React.Suspense>
      <div className="flex">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" disabled={table.getState().globalFilter}>
              <Search />
              {selectedOption.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[12.5rem] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandGroup>
                  {options.map(option => (
                    <CommandItem key={option.label} onSelect={() => handleSelect(option)}>
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          placeholder={'Search...'}
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          className="h-8 w-40 ml-2 lg:w-56 bg-card"
        />
      </div>
    </React.Suspense>
  );
}

export default SearchBy;
