import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { BerkasSidebar } from '@/components/berkas-sidebar';
import Heading from '@/components/heading';
import { PengaturanSidebar } from '@/components/pengaturan-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

const LayoutSettings = ({ children }: PropsWithChildren) => {
    
    return (
        <>
            <Head title="Pengaturan" />
            <PengaturanSidebar />
            <SidebarInset className="py-1">
                <main className="flex flex-1 flex-col space-y-2 pl-2 mt-(--header-height) h-[calc(100svh-var(--header-height))]!">
                    
                        {children}
                </main>
            </SidebarInset>
        </>
    )
}

LayoutSettings.layout = (page: React.ReactNode) => <AppLayout children={page} />

export default LayoutSettings;