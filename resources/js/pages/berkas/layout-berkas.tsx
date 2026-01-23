import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, RefreshCcw, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BerkasSidebar } from "@/components/berkas-sidebar";
import { Head, router, usePage } from "@inertiajs/react";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { usePrevious } from 'react-use';
import { debounce, pickBy } from 'lodash';
import berkas from "@/routes/berkas";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BreadcrumbItem, SharedData } from "@/types";
import Heading from "@/components/heading";
import { Dialog } from "@/components/ui/dialog";
import { useEcho } from "@laravel/echo-react";
import FormRegistrasiBerkas from "./dialog-form-registrasi";
import DialogDetailBerkas from "./dialog-detail-berkas";
import DialogDestroy from "./dialog-destroy";
import ButtonUpdateStatus from "./button-update-status";
import ButtonCatatan from "./button-catatan";
import ButtonHistory from "./button-history";
import { LabelIconStatus } from "./label-icon-status";
import DropDownPilihan from "./dropdown-action";
import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { BerkasProps, FieldDataBerkas, FilteredValues, ModeType, Riwayats, StatusType, UpdateJumlahCatatan } from "@/types/berkas";

const loads = [
    {
        name: "15",
        value: "15",
    },
    {
        name: "30",
        value: "30",
    },
    {
        name: "60",
        value: "60",
    },
    {
        name: "100",
        value: "100",
    },
]

export default function LayoutBerkas({ daftarberkas, tahun, menuOption, filtered, dataPendukung, totals }: BerkasProps) {
    const { auth, errors } = usePage<SharedData>().props;
    const [stateBerkas, setStateBerkas] = useState<FieldDataBerkas[] | []>(daftarberkas.data);
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

    const [values, setValues] = useState<FilteredValues>({
        cari: filtered.cari || '',
        load: filtered.load || '15',
        instansi: filtered.instansi || '',
        jenisspm: filtered.jenisspm || '',
        sumberdana: filtered.sumberdana || '',
    });

    const prevValues = usePrevious(values);
    
    const reload = useCallback(
        debounce((query) => {
            router.get(berkas.main({tahun: tahun, statusberkas: menuOption}), query, { 
                // only: ['daftarberkas', 'filtered'], 
                preserveScroll: true,
                preserveState: false, 
                replace: true
            });
        }, 500), 
    []);

    useEffect(() => {
        if (prevValues) {
            const query: any = Object.keys(pickBy(values)).length ? pickBy(values) : '';
            reload(query);
        }
    }, [values]);

    function handleInputCari(e: React.ChangeEvent<HTMLInputElement>) {
        setValues(values => ({
            ...values,
            cari: e.target.value
        }));
    };

    function refresh() {
        setValues({
            load: '15',
            cari: '',
            instansi: '',
            jenisspm: '',
            sumberdana: '',
        });
    };

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

                        if (itemBerkas.id === newData.berka_id) {
                            const existingItemIndex = itemBerkas.riwayats.find(item => 
                                item.id === newData.data.id
                            );

                            if (!existingItemIndex) {

                                const newItem: Riwayats = { 
                                    berka_id: newData.data.berka_id, 
                                    id: newData.data.id, 
                                    status_berka_id: newData.data.status_berka_id, 
                                    user_id: newData.data.user_id
                                };

                                return {
                                    ...itemBerkas,
                                    riwayats: [...itemBerkas.riwayats, newItem],
                                };

                            } else {

                                return {
                                    ...itemBerkas,
                                    riwayats: itemBerkas.riwayats.filter(item => 
                                        item.id !== existingItemIndex.id
                                    ),
                                };
                            }
                        }

                        return itemBerkas;
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

    const updateJumlahCatatan = (jumlahCatatan: UpdateJumlahCatatan) => {
        setStateBerkas(prevItems =>
            prevItems.map(item =>
                item.id === jumlahCatatan.berka_id ? { ...item, jumlah_catatan: jumlahCatatan.jumlah_catatan } : item
            )
        );
    };

    const addNew = (berkasBaru: FieldDataBerkas) => {
        const newItem = {
            hari: berkasBaru.hari,
            hari_ke: berkasBaru.hari_ke,
            id: berkasBaru.id,
            jam: berkasBaru.jam,
            jumlah_catatan: berkasBaru.jumlah_catatan,
            kegiatan: berkasBaru.kegiatan,
            kode: berkasBaru.kode,
            nama_instansi: berkasBaru.nama_instansi,
            nama_jenis_berkas: berkasBaru.nama_jenis_berkas,
            nama_sumber_dana: berkasBaru.nama_sumber_dana,
            no_spm: berkasBaru.no_spm,
            riwayats: berkasBaru.riwayats,
            status_berka_id: berkasBaru.status_berka_id,
            tgl_registrasi: berkasBaru.tgl_registrasi,
            tgl_spm: berkasBaru.tgl_spm
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
        case 'edit':
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

    useEcho<{newData:any}>(`${userChannel()}`, 'StatusBerkasEvent', (e: {newData:any}) => {

        const checkAuth: boolean = e.newData.user_id === auth.user.id;

        if (!checkAuth) {
            if (e.newData.info === "berkas") {
                switch (e.newData.action) {
                    case 'newBerkas':
                        if (menuOption === "registrasi" && auth.user.roleuser.slug === "admin" || auth.user.roleuser.slug === "verifikator") {
                            addNew(e.newData.data);
                        } else {
                            return () => e.newData.action;
                        }

                        break;
                    
                    case 'updateBerkas':
                        updateBerkas(e.newData);
                        
                        break;

                    case 'destroyBerkas':
                        destroyBerkas(e.newData.id);
                        
                        break;

                    case 'updateStatus':
                        updateStatusBerkas(e.newData);
                        
                        break;

                    default:
                        return () => checkAuth;
                }
            } else if (e.newData.info === "catatan") {
                updateJumlahCatatan(e.newData);
                setStateCatatans(e.newData);
            } else {
                return () => checkAuth;
            }
        } else {
            return () => checkAuth;
        }
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {title: 'Berkas', href: "#"},
        {title: menuOption, href: "#"}
    ];

    return (
        <>
            <Head title="Berkas" />
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
            <SidebarInset>
                <main className="flex flex-1 flex-col mt-(--header-height) h-[calc(100svh-var(--header-height))]!">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
                    <div className="p-4 bg-background shadow-sm rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <div className="flex">
                            <Heading
                                title={menuOption.charAt(0).toUpperCase() + menuOption.slice(1)}
                                description="Kelola data berkas pada tabel dibawah ini."
                            />
                            {auth.user.roleuser.slug === 'bendahara' && menuOption === "registrasi" ? (
                                <div className="ml-auto">
                                    <Button onClick={() => openModalCrud('create')} tabIndex={1}>Registrasi</Button>
                                </div>
                            ):(
                                ''
                            )}
                        </div>
                        <Separator className="mb-4" />
                        {errors.cari && 
                            <div className="flex max-w-xl whitespace-normal">
                                <Alert variant="destructive">
                                    <AlertCircleIcon />
                                    <AlertTitle>Pemberitahuan.</AlertTitle>
                                    <AlertDescription>
                                        <p>
                                            Tidak dizinkan menggunakan karakter simbol 
                                            (seperti tanda baca khusus, simbol matematika, 
                                            atau karakter non-alfanumerik) dalam pencarian.
                                        </p>
                                    </AlertDescription>
                                </Alert>
                            </div>
                        }
                        <div className="flex items-center py-4 gap-2">
                            <div>
                                <Select 
                                    name="jenisspm"
                                    value={values.jenisspm} 
                                    onValueChange={(e) => 
                                        setValues(values => ({
                                            ...values,
                                            jenisspm: e,
                                        }))
                                    }
                                >
                                    <SelectTrigger id="jenisspm" tabIndex={2} className="w-full">
                                        <SelectValue placeholder="Jenis SPM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Jenis SPM</SelectLabel>
                                            {dataPendukung.jenisberkas.map(item => (
                                                <SelectItem key={item.slug} value={item.slug}>{item.nama_jenis_berkas}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select 
                                    name="sumberdana"
                                    value={values.sumberdana} 
                                    onValueChange={(e) => 
                                        setValues(values => ({
                                            ...values,
                                            sumberdana: e,
                                        }))
                                    }
                                >
                                    <SelectTrigger id="sumberdana" tabIndex={3} className="w-full">
                                        <SelectValue placeholder="Sumber Dana" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sumber Dana</SelectLabel>
                                            {dataPendukung.sumberdana.map(item => (
                                                <SelectItem key={item.slug} value={item.slug}>{item.nama_sumber_dana}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select 
                                    name="instansi"
                                    value={values.instansi} 
                                    onValueChange={(e) => 
                                        setValues(values => ({
                                            ...values,
                                            instansi: e,
                                        }))
                                    }
                                >
                                    <SelectTrigger id="instansi" tabIndex={4} className="w-full">
                                        <SelectValue placeholder="Instansi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Instansi</SelectLabel>
                                            {dataPendukung.instansi.map(item => (
                                                <SelectItem key={item.slug} value={item.slug}>{item.nama_instansi}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <InputGroup>
                                    <InputGroupInput id='cari' name='cari' value={values.cari} onChange={handleInputCari} tabIndex={5} placeholder="Cari kegiatan..." autoFocus />
                                        <InputGroupAddon>
                                            <Search />
                                        </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <div>
                                <Button onClick={refresh} variant="outline" size="icon" aria-label="Refresh" tabIndex={6}>
                                    <RefreshCcw />
                                </Button>
                            </div>
                            <div className="ml-auto">
                                <div className='flex gap-2'>
                                    <div>
                                        <Select 
                                            name="load"
                                            value={values.load === '' ? filtered.load : values.load} 
                                            onValueChange={(e) => 
                                                setValues(values => ({
                                                    ...values,
                                                    load: e,
                                                }))
                                            }
                                        >
                                            <SelectTrigger id="load" tabIndex={7} className="w-full">
                                                <SelectValue placeholder={filtered.load} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {loads.map((load, key) => (
                                                    <SelectItem key={key} value={load.value}>{load.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
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
                                {stateBerkas.length > 0 ? (
                                    stateBerkas.map((item, index) => (
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
                                                <p className='text-sm/6 font-normal'>{item.kegiatan}</p>
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
                                                    <DropDownPilihan user={auth.user} openModalCrud={openModalCrud} openDialogDestroy={openDialogDestroy} openDialogDetail={openDialogDetail} dataValue={item.id} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    ):(
                                    <TableRow>
                                        <TableCell colSpan={7} className="font-normal text-muted-foreground">Tidak ada data ditemukan.</TableCell>
                                    </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                        <div className="grid items-center auto-rows-min gap-4 md:grid-cols-2 py-4">
                            <div className="text-foreground text-sm">
                                {daftarberkas?.meta.from} sampai {daftarberkas?.meta.to} dari total: {daftarberkas?.meta.total}
                            </div>
                            <div className="flex flex-1 flex-row-reverse">
                                <Pagination links={daftarberkas.links} meta={daftarberkas.meta} />
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </>
    );
}

LayoutBerkas.layout = (page: React.ReactNode) => <AppLayout children={page} />