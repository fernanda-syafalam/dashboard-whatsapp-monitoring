import { ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SelectDropdownProps {
  onValueChange: (value: string | string[]) => void;
  placeholder?: string;
  items: { label: string; value: string }[] | undefined;
  className: string;
  defaultValue?: { label: string; value: string } | { label: string; value: string }[];
  multiple?: boolean;
}

interface Selected {
  label: string;
  value: string;
}

export function SearchableDropdown({ onValueChange, items, placeholder, className, defaultValue, multiple = false }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState<Selected | Selected[] | null>(multiple ? [] : null);

  useEffect(() => {
    if (multiple) {
      if (Array.isArray(defaultValue)) {
        setSelectedOption(defaultValue);
      }
    } else {
      if (defaultValue && !Array.isArray(defaultValue) && defaultValue.value !== (selectedOption as Selected | null)?.value) {
        setSelectedOption(defaultValue);
      }
    }
  }, [multiple, selectedOption, defaultValue]);

  const handleSelected = (item: Selected) => {
    if (multiple) {
      let updated: Selected[];
      if (Array.isArray(selectedOption)) {
        const exists = selectedOption.some(opt => opt.value === item.value);
        // if clicked again it deleted the existing
        if (exists) {
          updated = selectedOption.filter(opt => opt.value !== item.value);
        } else {
          updated = [...selectedOption, item];
        }
      } else {
        updated = [item];
      }
      setSelectedOption(updated);
      onValueChange(updated.map(i => i.value));
      setSearch('');
    } else {
      setSelectedOption(item);
      setOpen(false);
      onValueChange(item.value);
    }
  };

  const isSelected = (item: Selected) => {
    if (multiple && Array.isArray(selectedOption)) {
      return selectedOption.some(opt => opt.value === item.value);
    } else if (!multiple && selectedOption) {
      return (selectedOption as Selected).value === item.value;
    }
    return false;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn('w-full justify-between font-normal bg-transparent', className)}>
          {multiple
            ? Array.isArray(selectedOption) && selectedOption.length > 0
              ? `${selectedOption[0].label}${selectedOption.length > 1 ? ` +${selectedOption.length - 1}` : ''}`
              : placeholder
            : (selectedOption as Selected | null)?.label ?? placeholder}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command className="z-50">
          <CommandInput placeholder="Search Input ..." value={search} onValueChange={e => setSearch(e)} />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items?.map(item => (
                <CommandItem
                  key={item.label}
                  value={item.label}
                  onSelect={() => handleSelected(item)}
                  className={multiple && isSelected(item) ? 'bg-green-50' : ''}
                >
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
