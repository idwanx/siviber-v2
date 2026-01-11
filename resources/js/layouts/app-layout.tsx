import { AppHeader } from '@/components/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { CircleCheckBig, CircleSlash2 } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Dialog } from '@/components/ui/dialog';
import DialogCatatanView from '@/pages/berkas/dialog-catatan-view';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

interface Catatans {
    berka_id: number;
    catatan: string;
    created_at: string;
    foto?: string;
    id: string;
    is_okey: boolean;
    is_okey_new?: boolean;
    jumlah_catatan?: number;
    name: string;
    user_id: number;
}

export default ({ children }: AppLayoutProps) => {
    const { auth, tahun } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const [tahunState, setTahunState] = useState<number | null>(null);
    const [dialogCatatan, setDialogCatatan] = useState<boolean>(false);
    const [dataCatatan, setDataCatatan] = useState<Catatans | null>(null);
    const dialogCatatanRef = useRef(dialogCatatan);

    const updateNewTahun = (newTahun: number) => {
        setTahunState(newTahun);
    };

    const userChannel = (): string | undefined => {
        if (auth.user.roleuser.slug === "admin" || auth.user.roleuser.slug === "verifikator") {
            return "admin-verifikator";
        } else if (auth.user.roleuser.instansi_id !== null) {
            return "instansi." + auth.user.roleuser.instansi_id;
        } else {
            return undefined;
        }
    };

    const handleOpenDialog = (berkas: Catatans) => {
        setDataCatatan(berkas);
        setDialogCatatan(true);
        dialogCatatanRef.current = true;
    };

    const handleDialogToggle = (dialogIsOpen: boolean) => {
        setDialogCatatan(dialogIsOpen);
        if (!dialogIsOpen) {
            dialogCatatanRef.current = false;
        }
    };
    
    useEffect(() => {
        if (tahunState) {
            router.visit(dashboard(tahunState));
        }

        return () => {
            tahunState;
        }
        
    }, [tahunState]);

    useEcho<{newData:any}>(`${userChannel()}`, 'StatusBerkasEvent', (e: {newData:any}) => {
        switch (e.newData.info) {
            case 'berkas':
                if (auth.user.roleuser.instansi_id !== null) {
                    switch (e.newData.data.status_berka_id) {
                        case 3:
                            toast(
                                <div className="flex py-4 first:pt-0 last:pb-0">
                                    <CircleSlash2 className='size-5.5 shrink-0 text-red-600' />
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-medium text-red-600">Berkas Penolakan</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {e.newData.data.kegiatan}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No.Spm: {e.newData.data.no_spm}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Tgl.Spm: {e.newData.data.tgl_spm}
                                    </p>
                                </div>
                                </div>
                                ,{
                                position: "top-center",
                                duration: 10000,
                                style: {
                                    '--normal-bg': 'var(--background)',
                                    '--normal-border': 'var(--destructive)'
                                } as React.CSSProperties
                            });
                        break;
                        case 4:
                            toast(
                                <div className="flex py-4 first:pt-0 last:pb-0">
                                    <CircleCheckBig className='size-5.5 shrink-0 text-green-600' />
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-medium text-green-600">Berkas Sp2d</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {e.newData.data.kegiatan}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No.Spm: {e.newData.data.no_spm}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Tgl.Spm: {e.newData.data.tgl_spm}
                                    </p>
                                </div>
                                </div>
                                ,{
                                position: "top-center",
                                duration: 10000,
                                style: {
                                    '--normal-bg': 'var(--background)',
                                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                                } as React.CSSProperties
                            });
                        break;
                        default:
                        return () => e.newData.data.status_berka_id;
                    }
                }
            break;
            case 'catatan':
                if (e.newData.action === "addcatatan" && auth.user.roleuser.instansi_id !== null) {
                    if (dialogCatatanRef.current) {
                        return setDataCatatan(e.newData);
                    } else {
                        return toast(
                            <div className="flex py-4 first:pt-0 last:pb-0">
                                <Avatar className="h-9 w-9 overflow-hidden rounded-full">
                                    <AvatarImage 
                                    src={`/storage/${e.newData.foto}`}
                                    alt={auth.user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(e.newData.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-medium text-blue-600">{e.newData.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        menambahkan catatan pada berkas anda.
                                    </p>
                                </div>
                            </div>
                            ,{
                            duration: Infinity,
                            closeButton: true,
                            action: {
                                label: "Lihat",
                                onClick: () => handleOpenDialog(e.newData),
                            },
                            style: {
                                '--normal-bg': 'var(--background)',
                                '--normal-button': 'light-dark(var(--color-green-600), var(--color-green-400))',
                                '--normal-border': 'light-dark(var(--color-blue-600), var(--color-blue-400))'
                            } as React.CSSProperties
                        });
                    }
                } else {
                    return setDataCatatan(e.newData);
                }
                
                break;
            default:
                return () => e.newData.info;
            }
    });

    return (
        <>
            <Dialog open={dialogCatatan}  onOpenChange={handleDialogToggle} modal>
                <DialogCatatanView 
                    dialogOpen={dialogCatatan} 
                    dataValue={dataCatatan}
                />
            </Dialog>
            <div className="[--header-height:calc(--spacing(14))]">
                <Toaster />
                <SidebarProvider className="flex flex-col">
                    <AppHeader tahun={tahun} updateNewTahun={updateNewTahun} />
                    <div className="flex flex-1 bg-sidebar">
                        {children}
                    </div>
                </SidebarProvider>
            </div>
        </>
    )
};
