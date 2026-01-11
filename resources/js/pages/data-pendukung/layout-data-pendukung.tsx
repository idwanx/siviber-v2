import { DataPendukungSidebar } from '@/components/data-pendukung-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function LayoutDataPendukung({ children }: AppLayoutProps) {
    return (
        <>
            <DataPendukungSidebar />
            <SidebarInset className='py-1'>
                <div className="flex flex-1 flex-col space-y-2 pl-2 mt-(--header-height) h-[calc(100svh-var(--header-height))]!">
                    
                    {children}
                </div>
            </SidebarInset>
        </>
    );
}

LayoutDataPendukung.layout = (page: React.ReactNode) => <AppLayout children={page} />