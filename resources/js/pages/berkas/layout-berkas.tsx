import { BerkasSidebar } from '@/components/berkas-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { CatatanMap, FieldDataBerkas, IndexBerkasProps, StatusType } from './types';
import { Head } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from '@/components/pagination';
import DropDownPilihan from './dropdown-action';
import { LabelIconStatus } from './label-icon-status';
import { Spinner } from '@/components/ui/spinner';
import ButtonUpdateStatus from './button-update-status';
import ButtonCatatan from './button-catatan';
import ButtonHistory from './button-history';
import FormRegistrasiBerkas from './dialog-form-registrasi';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DialogDestroy from './dialog-destroy';
import DialogDetailBerkas from './dialog-detail-berkas';

type ModeType = "create" | "update";

const LayoutBerkas = ({ auth, daftarberkas, menuOption }: IndexBerkasProps) => {
    const [stateBerkas, setStateBerkas] = useState<FieldDataBerkas[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalCrud, setModalCrud] = useState<boolean>(false);
    const [dialogDestroy, setDialogDestroy] = useState<boolean>(false);
    const [modeType, setModeType] = useState<ModeType>("create");
    const [dataState, setDataState] = useState<number>(0);

    const [dialogDetail, setDialogDetail] = useState<boolean>(false);

    const [stateCatatans, setStateCatatans] = useState<any | null>(null);

    const userChannel = (): string | undefined => {
        if (auth.user.roleuser.slug === "admin" || auth.user.roleuser.slug === "verifikator") {
            return "admin-verifikator";
        } else if (auth.user.roleuser.instansi_id !== null) {
            return "instansi." + auth.user.roleuser.instansi_id;
        } else {
            return undefined;
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {title: 'Berkas', href: "#"},
        {title: menuOption, href: "#"}
    ];

    function expired(hari: number, statusNow: StatusType) {
        switch (statusNow) {
        case 1:
            if (hari === 2) {
                return (
                    <>(hari ini expired)</>
                )
            } else if (hari > 2) {
                return (
                    <>(expired)</>
                )
            } else {
                return (
                    <>{null}</>
                )
            }
        case 2:
            if (hari === 2) {
                return (
                    <>(hari ini expired)</>
                )
            } else if (hari > 2) {
                return (
                    <>(expired)</>
                )
            } else {
                return (
                    <>{null}</>
                )
            }
        default:
            <>{null}</>
        }
    }

    const updateStatusBerkas = (newData: any) => {

        const statusBerkas = () => {
            switch (newData.data.status_berka_id) {
                case 1:
                    return 'registrasi';
                case 2:
                    return 'verifikasi';
                case 3:
                    return 'penolakan';
                case 4:
                    return 'sp2d';
                default:
                    throw new Error("Status tidak valid, harap hubungi admin");
            }
        };

        const checkStatus: boolean = statusBerkas() === menuOption;

        if (checkStatus) {
            setStateBerkas((prevState) => {
                const cekBerkas: boolean = prevState.some((item) => item.id === newData.berka_id);
                if (cekBerkas) {
                    return prevState.map(itemBerkas => {
                        const existingItemIndex = itemBerkas.riwayats.find(item => 
                            item.id === newData.data.id
                        );

                        let updatedItems: any[];

                        if (!existingItemIndex) {
                            const newItem = { 
                                berka_id: newData.data.berka_id, 
                                id: newData.data.id, 
                                status_berka_id: newData.data.status_berka_id, 
                                user_id: newData.data.user_id
                            };

                            updatedItems = [...itemBerkas.riwayats, newItem];

                        } else {

                            updatedItems = itemBerkas.riwayats.filter(item => 
                                item.id !== existingItemIndex.id
                            );
                        }

                        return {
                            ...itemBerkas,
                            riwayats: updatedItems
                        };
                    });
                    
                    
                } else {
                    return [newData.data,...prevState];
                }
            });
        } else {

            setStateBerkas(prevBerkas => {
                return prevBerkas.filter(item=> item.id !== newData.berka_id)
            });
        }
    };

    const updateJumlahCatatan = (jumlahCatatan: any) => {
        setStateBerkas(prevItems =>
            prevItems.map(item =>
                item.id === jumlahCatatan.berka_id ? { ...item, jumlah_catatan: jumlahCatatan.jumlah_catatan } : item
            )
        );
    };

    const addNew = (berkasBaru: FieldDataBerkas) => {
        const newItem = {
            id: berkasBaru.id,
            hari: berkasBaru.hari,
            hari_ke: berkasBaru.hari_ke,
            jam: berkasBaru.jam,
            jumlah_catatan: berkasBaru.jumlah_catatan,
            kegiatan: berkasBaru.kegiatan,
            kode: berkasBaru.kode,
            nama_instansi: berkasBaru.nama_instansi,
            nama_jenis_berkas: berkasBaru.nama_jenis_berkas,
            nama_sumber_dana: berkasBaru.nama_sumber_dana,
            no_spm: berkasBaru.no_spm,
            status_berka_id: berkasBaru.status_berka_id,
            tgl_spm: berkasBaru.tgl_spm,
            tgl_registrasi: berkasBaru.tgl_registrasi,
            riwayats: berkasBaru.riwayats
        };
        setStateBerkas((prevData) => {
            return [newItem,...prevData]
        });
    };

    const updateBerkas = (dataUpdate: FieldDataBerkas) => {
        setStateBerkas(prevItems =>
            prevItems.map(item =>
                item.id === dataUpdate.id ? { ...item, 
                    hari_ke: dataUpdate.hari_ke,
                    id: dataUpdate.id,
                    kegiatan: dataUpdate.kegiatan,
                    nama_jenis_berkas: dataUpdate.nama_jenis_berkas,
                    nama_sumber_dana: dataUpdate.nama_sumber_dana,
                    no_spm: dataUpdate.no_spm,
                    tgl_spm: dataUpdate.tgl_spm,
                } : item
            )
        );
    };

    const destroyBerkas = (berkasId: number) => {
        setStateBerkas(prevItems =>
            prevItems.filter(item => item.id !== berkasId)
        );
    };

    const openModalCrud = ( mode: ModeType, item?: number ) => {
        setModeType(mode);
        
        switch (mode) {
        case 'update':
            setDataState(item!);
            setModalCrud(true);
            break;
        default:
            setModalCrud(true);
            break;
        }
    };

    const openDialogDestroy = ( item?: number ) => {
        setDataState(item!);
        setDialogDestroy(true);
    };

    const openDialogDetail = ( item?: number ) => {
        setDataState(item!);
        setDialogDetail(true);
    };

    const handleDialogToggle = (dialogIsOpen: boolean) => {
        setModalCrud(dialogIsOpen);

        if (!dialogIsOpen) {
            setDataState(0);
            setModeType("create");
        };
    };

    const handleDialogToggleDetail = (dialogIsOpen: boolean) => {
        setDialogDetail(dialogIsOpen);
    };

    const handleDialogToggleDestroy = (dialogIsOpen: boolean) => {
        setDialogDestroy(dialogIsOpen);
        
        if (!dialogIsOpen) {
            setDataState(0);
            setModeType("create");
        };
    };

    useEcho<{newData:any}>(`${userChannel()}`, 'StatusBerkasEvent', (e: {newData:any}) => {
        const checkAuth: boolean = e.newData.user_id === auth.user.id;
        switch (e.newData.info) {
            case 'berkas':
                if (e.newData.action === "newBerkas") {
                    if (menuOption === "registrasi" && auth.user.roleuser.slug === "admin" || auth.user.roleuser.slug === "verifikator") {
                        addNew(e.newData);
                    } else {
                        return () => e.newData.info;
                    }
                } else if (e.newData.action === "updateBerkas") {
                    updateBerkas(e.newData);
                } else if (e.newData.action === "destroyBerkas") {
                    destroyBerkas(e.newData.id);
                } else if (e.newData.action === "updateStatus") {
                    updateStatusBerkas(e.newData);
                }
                break;
            case 'catatan':
                if (checkAuth) {
                    return () => checkAuth;
                } else {
                    updateJumlahCatatan(e.newData);
                    setStateCatatans(e.newData);
                }
                
                break;
            default:
                return () => checkAuth;
        }
    });

    useEffect(() => {
        setIsLoading(true);
        
        if (menuOption) {
            setStateBerkas(daftarberkas?.data);
            setIsLoading(false);
        }
        
        return () => {
            menuOption;
        }
        
    }, [menuOption]);

    return (
        <>
            <Dialog open={modalCrud} onOpenChange={handleDialogToggle} modal>
                <FormRegistrasiBerkas
                    modalCrud={modalCrud}
                    addNew={addNew}
                    dataState={dataState}
                    modeType={modeType}
                    closeModal={handleDialogToggle}
                    updateBerkas={updateBerkas}
                />
            </Dialog>
            <Dialog open={dialogDetail} onOpenChange={handleDialogToggleDetail} modal>
                <DialogDetailBerkas
                    isDialog={dialogDetail}
                    dataState={dataState}
                    closeModal={handleDialogToggleDetail}
                />
            </Dialog>
            <Dialog open={dialogDestroy} onOpenChange={handleDialogToggleDestroy} modal>
                <DialogDestroy
                    dataState={dataState}
                    closeModal={handleDialogToggleDestroy}
                    destroyBerkas={destroyBerkas}
                />
            </Dialog>
            <BerkasSidebar />
            <Head title="Berkas" />
            <SidebarInset className="py-1">
                <div className="flex flex-1 flex-col space-y-2 pl-2 mt-(--header-height) h-[calc(100svh-var(--header-height))]!">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
                    <div className="min-h-screen p-4 flex-1 overflow-hidden bg-background shadow-sm rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <div className="flex flex-1">
                            <Heading
                                title={menuOption.charAt(0).toUpperCase() + menuOption.slice(1)}
                                description="Kelola data berkas pada tabel dibawah ini."
                            />
                            {auth.user.roleuser.slug === 'bendahara' && menuOption === "registrasi" ? (
                                <div className="ml-auto">
                                    <Button onClick={() => openModalCrud('create')}>Registrasi</Button>
                                </div>
                            ):(
                                ''
                            )}
                        </div>
                        <Separator className="mb-4" />
                        <div className="flex items-center py-4 gap-2">
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div className="ml-auto">
                                <div className='flex gap-2'>
                                    -
                                </div>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12.5 text-center">No</TableHead>
                                    <TableHead className="w-35">Waktu Registrasi</TableHead>
                                    <TableHead className="w-30 text-center">Jenis Berkas</TableHead>
                                    <TableHead>Kegiatan</TableHead>
                                    <TableHead className="w-52 2xl:w-80 hidden 2xl:table-cell text-center">Instansi</TableHead>
                                    <TableHead className="w-36 text-center">Sumber Dana</TableHead>
                                    <TableHead className="w-28 text-center">Status</TableHead>
                                    <TableHead className="w-20 text-center">Pilihan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <div className="flex gap-2 items-center"><Spinner />Loading...</div>
                                        </TableCell>
                                    </TableRow>
                                ):(
                                    stateBerkas?.length! > 0 ? (
                                        stateBerkas?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">
                                                    {daftarberkas?.meta.from ? daftarberkas?.meta.from + index : index + 1}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {item.hari}<br />
                                                    {item.tgl_registrasi}<br />
                                                    {item.jam}
                                                </TableCell>
                                                <TableCell className="text-center">{item.nama_jenis_berkas}</TableCell>
                                                <TableCell className="whitespace-normal">
                                                    <div className='2xl:hidden md:w-100 text-muted-foreground mb-0.5 md:truncate'>
                                                        {item.nama_instansi}
                                                    </div>
                                                    <p>{item.kegiatan}</p>
                                                    <div className="text-muted-foreground sm:grid sm:grid-cols-6">
                                                        <div>No. Spm</div>
                                                        <div className="sm:col-span-5">: {item.no_spm}</div>
                                                    </div>
                                                    <div className="text-muted-foreground sm:grid sm:grid-cols-6">
                                                        <div>Tgl. Spm</div>
                                                        <span className="sm:col-span-2">:  {item.tgl_spm}</span>
                                                        <span className="sm:col-span-2 text-destructive">
                                                            {expired(item.hari_ke, item.status_berka_id)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center pt-3">
                                                        <div className="flex">
                                                            <ButtonHistory dataValue={item} />
                                                            <ButtonCatatan stateCatatans={stateCatatans} user={auth.user} updateJumlahCatatan={updateJumlahCatatan} dataValue={item} />
                                                        </div>
                                                        <ButtonUpdateStatus 
                                                            updateStatusBerkas={updateStatusBerkas}
                                                            dataValue={item}
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden 2xl:table-cell text-center whitespace-normal">{item.nama_instansi}</TableCell>
                                                <TableCell className="text-center">{item.nama_sumber_dana}</TableCell>
                                                <TableCell>
                                                    <LabelIconStatus status={item.status_berka_id} />
                                                </TableCell>
                                                <TableCell>
                                                    <div className='flex justify-center'>
                                                        <DropDownPilihan openModalCrud={openModalCrud} openDialogDestroy={openDialogDestroy} openDialogDetail={openDialogDetail} dataValue={item.id} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ):(
                                        <TableRow>
                                            <TableCell colSpan={7} className="font-normal">Tidak ada data.</TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                        <div className="grid items-center auto-rows-min gap-4 md:grid-cols-2 py-4">
                            <div className="text-foreground text-sm">
                                {daftarberkas?.meta.from} sampai {daftarberkas?.meta.to} dari total: {daftarberkas?.meta.total}
                            </div>
                            <div className="flex flex-1 flex-row-reverse">
                                <Pagination links={daftarberkas?.links} meta={daftarberkas?.meta} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </>
    )
}

LayoutBerkas.layout = (page: React.ReactNode) => <AppLayout children={page} />

export default LayoutBerkas;