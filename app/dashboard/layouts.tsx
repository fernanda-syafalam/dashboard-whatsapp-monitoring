'use client';

import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/appSidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import Link from 'next/link';
import { helper } from '@/helper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/dashboard">Home</Link>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                  const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                  return (
                    <React.Fragment key={url}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {index === pathSegments.length - 1 ? (
                          <BreadcrumbPage>{helper.capitalize(segment)}</BreadcrumbPage>
                        ) : (
                          <Link href={url}>{helper.capitalize(segment)}</Link>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
