import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import instansi from '@/routes/instansi';
import jenisBelanja from '@/routes/jenis-belanja';
import jenisBerkas from '@/routes/jenis-berkas';
import sumberDana from '@/routes/sumber-dana';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CircleSmall } from 'lucide-react';
import { resolveUrl } from "@/lib/utils";
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';

export function PengaturanSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();

    const mainNavItems: NavItem[] = [
        {
            title: 'Profil',
            href: edit(),
            icon: null,
        },
        {
            title: 'Password',
            href: editPassword(),
            icon: null,
        },
        {
            title: 'Autentikasi Dua Faktor',
            href: show(),
            icon: null,
        },
        {
            title: 'Tampilan',
            href: editAppearance(),
            icon: null,
        },
    ];

    return (
        <Sidebar 
            className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
            variant="inset"
        >
            <SidebarContent>
                <SidebarGroup className="mt-2 py-0">
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
                                    <Link href={item.href}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
