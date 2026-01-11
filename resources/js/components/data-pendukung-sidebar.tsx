import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
} from '@/components/ui/sidebar';
import instansi from '@/routes/instansi';
import jenisBelanja from '@/routes/jenis-belanja';
import jenisBerkas from '@/routes/jenis-berkas';
import penerima from '@/routes/penerima';
import rincianBelanja from '@/routes/rincian-belanja';
import sumberDana from '@/routes/sumber-dana';
import { type NavItem } from '@/types';
import { CircleSmall } from 'lucide-react';

export function DataPendukungSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const mainNavItems: NavItem[] = [
        {
            title: 'Instansi',
            href: instansi.index(),
            icon: CircleSmall,
            role: 'admin',
        },
        {
            title: 'Jenis SPM',
            href: jenisBerkas.index(),
            icon: CircleSmall,
            role: 'admin',
        },
        {
            title: 'Sumber Dana',
            href: sumberDana.index(),
            icon: CircleSmall,
            role: 'admin',
        },
        {
            title: 'Jenis Belanja',
            href: jenisBelanja.index(),
            icon: CircleSmall,
            role: 'admin',
        },
        {
            title: 'Rincian Belanja',
            href: rincianBelanja.index(),
            icon: CircleSmall,
            role: 'admin',
        },
        {
            title: 'Penerima',
            href: penerima.index(),
            icon: CircleSmall,
            role: 'bendahara',
        }
    ];

    return (
        <Sidebar 
            className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
            variant="inset"
            {...props}
        >
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
