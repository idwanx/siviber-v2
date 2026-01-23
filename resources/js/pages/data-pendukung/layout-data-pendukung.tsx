import AppLayout from '@/layouts/app-layout';
import { DataPendukungSidebar } from '@/components/data-pendukung-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function LayoutDataPendukung({ children }: AppLayoutProps) {
    return (
        <>
            <DataPendukungSidebar />
            <SidebarInset>
                <main className="flex flex-1 flex-col mt-(--header-height) h-[calc(100svh-var(--header-height))]!">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}

LayoutDataPendukung.layout = (page: React.ReactNode) => <AppLayout children={page} />