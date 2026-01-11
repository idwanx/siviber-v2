import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { BerkasSidebar } from '@/components/berkas-sidebar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { SidebarInset } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Berkas', href: dashboard().url},
    {title: 'Registrasi', href: dashboard().url}
];

interface IndexBerkasProps extends Record<string, any> {
    daftarberkas: any;
}

export default function Dashboard({ daftarberkas }: IndexBerkasProps) {
    
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <SidebarInset className='p-1'>
                <div className="flex flex-1 flex-col space-y-2 pl-2 mt-(--header-height) h-[calc(100svh-var(--header-height))]!">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={false} />
                    <div className="flex flex-1 flex-col gap-4 rounded-xl p-4 bg-background">
                        <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
                        <p>This is the main content. It will scroll vertically.</p>
                        <p>Scroll down to see the fixed sidebar in action.</p>
                        {Array.from({ length: 24 }).map((_, index) => (
                            <div
                            key={index}
                            className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </AppLayout>
    );
}
