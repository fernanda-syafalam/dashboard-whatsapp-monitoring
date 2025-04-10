'use client';

import { ChevronsUpDown, CreditCard, LogOut, Settings, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdownMenu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import React from 'react';

const NAV_USER_MENU = [
  { title: 'Upgrade to Pro', icon: Sparkles, url: '#', separator: true },
  { title: 'Billing', icon: CreditCard, url: '#' },
  { title: 'Settings', icon: Settings, url: '#', separator: true },
  { title: 'Logout', icon: LogOut, url: '#' }
];

export function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              {renderUserAvatar(user)}
              {renderUserInfo(user)}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {renderUserAvatar(user)}
                {renderUserInfo(user)}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NAV_USER_MENU.map((item, index) => (
              <React.Fragment key={item.title}>
                <DropdownMenuItem>
                  {item.icon && <item.icon />}
                  {item.title}
                </DropdownMenuItem>
                {item.separator && index !== NAV_USER_MENU.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const renderUserAvatar = (user: { name: string; email: string; avatar: string }) => (
  <Avatar className="h-8 w-8 rounded-lg">
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
  </Avatar>
);

const renderUserInfo = (user: { name: string; email: string; avatar: string }) => (
  <div className="grid flex-1 text-left text-sm leading-tight">
    <span className="truncate font-medium">{user.name}</span>
    <span className="truncate text-xs">{user.email}</span>
  </div>
);
