import AppearanceTabs from '@/components/appearance-tabs';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import LayoutSettings from './layout-settings';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Pengaturan', href: "#"},
    {title: 'Tampilan', href: "#"}
];

export default function Appearance() {
    return (
        <>
        <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
        <div className="flex-1 w-full overflow-hidden">
            <div className="bg-background shadow-sm rounded-xl p-4 border border-sidebar-border/70 sm:max-w-lg dark:border-sidebar-border">
            <div className="flex flex-1">
                <Heading
                    title="Tampilan"
                />
            </div>
            <Separator className="mb-6" />
            <AppearanceTabs />
            </div>
        </div>
        </>
    );
}


Appearance.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>
        <LayoutSettings children={page} />
    </AppLayout>
)