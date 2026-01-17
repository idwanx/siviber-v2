import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import berkas from '@/routes/berkas';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { resolveUrl } from "@/lib/utils";
import { Check, CircleCheckBig, CircleSlash2, FileInput } from 'lucide-react';
import { NavLaporanBerkas } from './nav-laporan-berkas';

interface PropsTahun {
    tahun: number;
    [key: string]: unknown;
}

export function BerkasSidebar() {
    const { url } = usePage();

    const { tahun } = usePage<PropsTahun>().props;
    
    const currentYear: number = new Date().getFullYear();

    const mainNavItems: NavItem[] = [
    {
        title: 'Registrasi',
        href: berkas.main({ tahun: !tahun ? currentYear : tahun, statusberkas: "registrasi" }),
        icon: FileInput
    },
    {
        title: 'Verifikasi',
        href: berkas.main( { tahun: !tahun ? currentYear : tahun, statusberkas: "verifikasi" }),
        icon: Check,
    },
    {
        title: 'Penolakan',
        href: berkas.main( { tahun: !tahun ? currentYear : tahun, statusberkas: "penolakan" }),
        icon: CircleSlash2,
    },
    {
        title: 'Sp2d',
        href: berkas.main( { tahun: !tahun ? currentYear : tahun, statusberkas: "sp2d" }),
        icon: CircleCheckBig,
    },
];

    return (
        <Sidebar 
            className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
            variant="inset"
        >
            <SidebarContent>
                {/* <NavMain items={mainNavItems} /> */}
                <SidebarGroup className="mt-2 py-0">
                    <SidebarGroupLabel>Status</SidebarGroupLabel>
                    <SidebarMenu>
                        {mainNavItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={url.startsWith(
                                        resolveUrl(item.href),
                                    )}
                                    tooltip={{ children: item.title }}
                                >
                                    {/* <Link href={item.href} only={['daftarberkas', 'tahun', 'menuOption', 'filtered']}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link> */}
                                    <Link href={item.href}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        
                    </SidebarMenu>
                </SidebarGroup>
                <NavLaporanBerkas />
            </SidebarContent>
        </Sidebar>
    );
}
