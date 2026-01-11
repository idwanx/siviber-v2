import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import {
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useMemo } from 'react';
import { cn } from '@/lib/utils'

export function NavTahun({tahun, updateNewTahun}: {tahun?: number | null, updateNewTahun: (newtahun: number) => void}) {

    const currentYear = new Date().getFullYear();

    const years = useMemo(() => {
        const startYear = 2024;
        const yearsList: number[] = [];
        for (let year = startYear; year <= currentYear; year++) {
        yearsList.push(year);
        }
        return yearsList;
    }, []);
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="group h-9 data-[state=open]:bg-sidebar-accent"
                    data-test="sidebar-menu-button"
                >
                    {!tahun ? currentYear : tahun}
                    <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {years.map((year) => (
                    <DropdownMenuItem key={year} onSelect={() => updateNewTahun(year)}>
                        {year}
                        <CheckIcon className={cn('ml-auto', year === tahun ? 'opacity-100' : 'opacity-0')} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
