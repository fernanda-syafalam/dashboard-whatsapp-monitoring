'use client';

import { type LucideIcon } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
              <SidebarMenuButton tooltip={item.title} isActive={pathname == item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
