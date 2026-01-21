import AppLayout from '@/layouts/app-layout';
import { PengaturanSidebar } from '@/components/pengaturan-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

const LayoutSettings = ({ children }: PropsWithChildren) => {
    
    return (
        <>
            <Head title="Pengaturan" />
            <PengaturanSidebar />
            <SidebarInset>
                <main className="flex flex-1 flex-col">
                    {children}
                </main>
            </SidebarInset>
        </>
    )
}

LayoutSettings.layout = (page: React.ReactNode) => <AppLayout children={page} />

export default LayoutSettings;