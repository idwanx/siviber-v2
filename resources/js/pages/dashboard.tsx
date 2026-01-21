import AppLayout from '@/layouts/app-layout';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BerkasSidebar } from '@/components/berkas-sidebar';

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Berkas', href: dashboard().url},
    {title: 'Registrasi', href: dashboard().url}
];

export default function Dashboard() {
    const { tahun } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Dashboard" />
            <SidebarInset className='px-4'>
                <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={false} />
                <div className="max-h-screen p-4 bg-background shadow-sm rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    ergeger dfdfd dsfds idwan
                </div>
            </SidebarInset>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout children={page} />