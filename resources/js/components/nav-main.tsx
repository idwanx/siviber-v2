import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { auth } = usePage<SharedData>().props;

    const menuSidebar = items.filter((item) => {
        if (auth.user.roleuser.slug === "admin") {
            return item
        } else if (auth.user.roleuser.slug === "bendahara") {
            return item.role === 'bendahara'
        }
    });
    
    return (
        <SidebarGroup className="mt-2 py-0">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {menuSidebar.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(
                                resolveUrl(item.href),
                            )}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
