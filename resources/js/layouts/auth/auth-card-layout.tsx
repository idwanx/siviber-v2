import AppLogo from '@/components/app-logo';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {

    const { url } = usePage();
    
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-8">
            <div className={`flex w-full ${url.startsWith('/register') ? 'max-w-2xl' : 'max-w-md'} flex-col`}>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-center">
                        {/* <AppLogo /> */}
                        <img className="h-9 w-9" src="/apple-touch-icon.png" alt="" />
                        <div className="ml-2 overflow-hidden leading-5 tracking-[.10em]">
                            <p className="text-md/2 font-bold text-gray-900 dark:text-white">BPKPD</p>
                            <p className="text-md/2 font-bold text-destructive">BOLSEL</p>
                        </div>
                    </div>
                    <Card className="rounded-xl">
                        <CardHeader className="px-10">
                            <CardTitle className="text-2xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10">
                            {children}
                        </CardContent>
                    </Card>
                    <div className="px-6 text-xs text-center text-muted-foreground">
                        Copyright © 2026 - {new Date().getFullYear()} <br />Badan Pengelolaan Keuangan dan Pendapatan Daerah (BPKPD)<br />
                        Kabupaten Bolaang Mongondow Selatan
                    </div>
                </div>
            </div>
        </div>
    );
}
