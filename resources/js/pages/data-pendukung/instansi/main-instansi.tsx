import AppLayout from '@/layouts/app-layout';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2Icon, RefreshCcw, Search, Trash } from 'lucide-react';
import { debounce, pickBy } from 'lodash';
import { usePrevious } from 'react-use';
import { Dialog } from '@/components/ui/dialog';
import instansi from '@/routes/instansi';
import LayoutDataPendukung from '../layout-data-pendukung';
import Heading from '@/components/heading';
import DialogFormInstansi from './form-instansi';
import Pagination from '@/components/pagination';
import { Links, Meta } from '../types';

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

interface FieldData {
    nama_instansi?: string
    slug?: string
}

interface DataInstansi {
    data: FieldData[];
    links: Links
    meta: Meta;
}

interface IndexInstansiProps {
    instansis: DataInstansi;
    filtered: FilteredValue;
}

interface FilteredValue {
    cari: string;
    load: string;
    [key: string]: unknown;
}

type ModeType = "create" | "update" | "destroy";

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Data Pendukung', href: instansi.index().url},
    {title: 'Instansi', href: "#"}
];

export default function MainInstansi({ instansis, filtered }: IndexInstansiProps) {
    const [modalCrud, setModalCrud] = useState<boolean>(false);
    const [modeType, setModeType] = useState<ModeType>("create");

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm<FieldData>({
        nama_instansi: '',
        slug: '',
    });

    const openModalCrud = ( mode: ModeType, item?: any ) => {
        setModeType(mode);
        
        switch (mode) {
        case 'update':
            setData(item);
            setModalCrud(true);
            break;
        case 'destroy':
            setData(item);
            setModalCrud(true);
            break;
        default:
            setModalCrud(true);
            break;
        }
    };
    
    const handleDialogToggle = (modalIsOpen: boolean) => {
        setModalCrud(modalIsOpen);

        if (!modalIsOpen) {
            reset();
            clearErrors();
        };
    };
    
    const [values, setValues] = useState({
        cari: filtered.cari || '',
        load: filtered.load || '',
    });

    const prevValues = usePrevious(values);

    const reload = useCallback(
        debounce((query) => {
            router.get(instansi.index(), query, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 500)
    , []);

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length ? pickBy(values) : '';
            reload(query);
        }
    }, [values]);

    function handleInputCari(e: React.ChangeEvent<HTMLInputElement>) {
        setValues(values => ({
            ...values,
            cari: e.target.value
        }));
    };

    function handleSelectLoad(e: string) {
        setValues(values => ({
            ...values, load: e
        }));
    };

    function refresh() {
        setValues({
            load: '',
            cari: '',
        });
    };

    return (
        <>
            <Head title="Instansi" />
            <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
            <Dialog open={modalCrud}  onOpenChange={handleDialogToggle}>
                <DialogFormInstansi
                    data={data}
                    post={post}
                    put={put}
                    setData={setData}
                    processing={processing} 
                    errors={errors}
                    mode={modeType}
                    closeModal={handleDialogToggle}
                    reset={reset}
                    clearErrors={clearErrors}
                />
            </Dialog>
            <div className="p-4 bg-background shadow-sm rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <div className="flex">
                    <Heading
                        title="Instansi"
                        description="Kelola data instansi pada tabel dibawah ini."
                    />
                    <div className="ml-auto">
                        <Button onClick={() => openModalCrud('create')}>Tambah</Button>
                    </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex items-center py-4 gap-2">
                    <div>
                        <Select 
                            name="load"
                            value={values.load === '' ? filtered.load : values.load} 
                            onValueChange={(e) => handleSelectLoad(e)}
                        >
                            <SelectTrigger tabIndex={1} className="w-full">
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
                    <div>
                        <InputGroup>
                            <InputGroupInput id='cari' name='cari' value={values.cari} onChange={handleInputCari} placeholder="Cari..." />
                                <InputGroupAddon>
                                    <Search />
                                </InputGroupAddon>
                            {/* <InputGroupAddon align="inline-end"><X /></InputGroupAddon> */}
                        </InputGroup>
                    </div>
                    <div>
                        <Button onClick={refresh} variant="outline" size="icon" aria-label="Refresh">
                            <RefreshCcw />
                        </Button>
                    </div>
                    <div className="ml-auto">
                        <div className='flex gap-2'>
                            {/* silahkan di isi */}
                        </div>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-20 text-center">No</TableHead>
                        <TableHead>Nama Instansi</TableHead>
                        <TableHead className="w-36 text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {instansis.data.length > 0 ?
                            instansis.data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">
                                        {instansis.meta.from + index}
                                    </TableCell>
                                    <TableCell>{item.nama_instansi}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-3 justify-center'>
                                            <Button variant="outline" size="icon-sm" aria-label="Edit" onClick={() => openModalCrud('update', item)}>
                                                <Edit2Icon />
                                            </Button>
                                            <Button variant="outline" size="icon-sm" aria-label="Hapus" onClick={() => openModalCrud('destroy', item)}>
                                                <Trash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="font-normal">Tidak ada data. Silahkan klik tombol Tambah untuk menambah.</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
                <div className="grid items-center auto-rows-min gap-4 md:grid-cols-2 py-4">
                    <div className="text-foreground text-sm">
                        {instansis.meta.from} sampai {instansis.meta.to} dari total: {instansis.meta.total}
                    </div>
                    <div className="flex flex-1 flex-row-reverse">
                        <Pagination links={instansis.links} meta={instansis?.meta} />

                    </div>
                </div>
            </div>
        </>
    );
}

MainInstansi.layout = (page: React.ReactNode) => (
    <AppLayout>
        <LayoutDataPendukung children={page} />
    </AppLayout>
)