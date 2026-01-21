import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import berkas from '@/routes/berkas';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { resolveUrl } from "@/lib/utils";
import { Check, CircleCheckBig, CircleSlash2, FileInput } from 'lucide-react';
import { NavLaporanBerkas } from './nav-laporan-berkas';
import { useEcho } from '@laravel/echo-react';
import { router } from '@inertiajs/react'

export function BerkasSidebar() {
    const page = usePage<SharedData>();
    const { auth, tahun, totals } = page.props;

    const userChannel = (): string | undefined => {
        if (auth.user.roleuser.slug === "admin" || auth.user.roleuser.slug === "verifikator") {
            return "admin-verifikator";
        } else if (auth.user.roleuser.instansi_id !== null) {
            return "instansi." + auth.user.roleuser.instansi_id;
        } else {
            return undefined;
        }
    };

    const mainNavItems: NavItem[] = [
        {
            title: 'Registrasi',
            href: berkas.main({ tahun: tahun, statusberkas: "registrasi" }),
            icon: FileInput,
            totals: totals.registrasi,
        },
        {
            title: 'Verifikasi',
            href: berkas.main( { tahun: tahun, statusberkas: "verifikasi" }),
            icon: Check,
            totals: totals.verifikasi,
        },
        {
            title: 'Penolakan',
            href: berkas.main( { tahun: tahun, statusberkas: "penolakan" }),
            icon: CircleSlash2,
            totals: totals.penolakan,
        },
        {
            title: 'Sp2d',
            href: berkas.main( { tahun: tahun, statusberkas: "sp2d" }),
            icon: CircleCheckBig,
            totals: totals.sp2d,
        },
    ];

    useEcho<{newData:any}>(`${userChannel()}`, 'StatusBerkasEvent', (e: {newData:any}) => {
        const checkAuth: boolean = e.newData.user_id === auth.user.id;

        if (!checkAuth) {
            router.reload({ only: ['totals'] })
        } else {
            return () => checkAuth;
        }
        
    });

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
                                    isActive={page.url.startsWith(
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
                                <SidebarMenuBadge>{item.totals === 0 ? '' : item.totals}</SidebarMenuBadge>
                            </SidebarMenuItem>
                        ))}
                        
                    </SidebarMenu>
                </SidebarGroup>
                <NavLaporanBerkas />
            </SidebarContent>
        </Sidebar>
    );
}
