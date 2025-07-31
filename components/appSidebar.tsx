'use client';

import * as React from 'react';
import { AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Users } from 'lucide-react';

import { NavMain } from '@/components/sidebar/sidebarMain';
import { NavUser } from '@/components/sidebar/sidebarUser';
import { TeamSwitcher } from '@/components/sidebar/sidebarTeamSwitcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/authStore';

const data = {
  teams: [
    {
      name: 'Asasta Indonesia',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Arthaprada ',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Frame,
      isActive: true
    },
    {
      title: 'Bots',
      url: '/dashboard/bots',
      icon: Bot,
      isActive: false
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: Users,
      isActive: false
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore(state => state.user) || {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  };

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
