import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Berkas', href: dashboard().url},
    {title: 'Registrasi', href: dashboard().url}
];

export default function Dashboard() {
    const { tahun } = usePage<SharedData>().props;


    return (
        <>
            <Head title="Dashboard" />
            <SidebarInset>

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

            </SidebarInset>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout children={page} />