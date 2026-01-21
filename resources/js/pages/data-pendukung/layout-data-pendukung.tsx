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
                <div className="flex flex-1 flex-col">
                    {children}
                </div>
            </SidebarInset>
        </>
    );
}

LayoutDataPendukung.layout = (page: React.ReactNode) => <AppLayout children={page} />