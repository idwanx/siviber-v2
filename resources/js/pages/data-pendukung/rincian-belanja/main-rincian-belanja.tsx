import AppLayout from '@/layouts/app-layout';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import LayoutDataPendukung from '../layout-data-pendukung';
import Heading from '@/components/heading';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
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
import rincianBelanja from '@/routes/rincian-belanja';
import Pagination from '@/components/pagination';
import { debounce, pickBy } from 'lodash';
import { usePrevious } from 'react-use';
import { Dialog } from '@/components/ui/dialog';
import { DialogFormRincianBelanja } from './form-rincian-belanja';
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Data Pendukung', href: '#' },
    { title: 'Rincian Belanja', href: rincianBelanja.index().url },
];

interface FieldData {
    jenis_belanja_id: string
    kode_rincian_belanja: string
    nama_rincian_belanja: string
    slug: string
}

interface FetchdData {
    jenis_belanja: string
    jenis_belanja_id: string
    kode_rincian_belanja: string
    nama_rincian_belanja: string
    slug: string
}

interface DataRincianBelanja {
    data: FetchdData[];
    links: Links
    meta: Meta;
}

interface IndexRincianBelanjaProps {
    rincianbelanjas: DataRincianBelanja;
}

interface FilteredValue {
    cari: string;
    load: string;
}

interface FilteredData {
    filtered: FilteredValue;
    [key: string]: unknown;
}


export default function MainRincianBelanja({ rincianbelanjas }: IndexRincianBelanjaProps) {

    const [modalCrud, setModalCrud] = useState<boolean>(false);
    const [mode, setMode] = useState<'create' | 'update' | 'destroy'>('create');

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm<FieldData>({
        jenis_belanja_id: '',
        kode_rincian_belanja: '',
        nama_rincian_belanja: '',
        slug: '',
    });
    
    const openModalCrud = ( mode: 'create' | 'update' | 'destroy', item?: any ) => {
        
        setMode(mode);
        
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

    const page = usePage<FilteredData>();

    const { filtered } = page.props;

    const [valuesActions, setValuesActions] = useState({
        cari: filtered.cari || '',
        load: filtered.load || '',
    });

    const prevValues = usePrevious(valuesActions);

    const reload = useCallback(
        debounce((query) => {
            router.get(page.url, query, {
                preserveState: true,
                replace: true
            });
        }, 500)
    , []);

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(valuesActions)).length ? pickBy(valuesActions) : '';
            reload(query);
        }
    }, [valuesActions]);

    function handleInputCari(e: React.ChangeEvent<HTMLInputElement>) {
        setValuesActions(values => ({
            ...values,
            cari: e.target.value
        }));
    };

    function handleSelectLoad(e: string) {
        setValuesActions(values => ({
            ...values, load: e
        }));
    };

    function refresh() {
        setValuesActions({
            load: '',
            cari: ''
        });
    };
    

    return (
        <>
            <Head title="Instansi" />
            <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
            <Dialog open={modalCrud}  onOpenChange={handleDialogToggle}>
                <DialogFormRincianBelanja
                    data={data}
                    post={post}
                    put={put}
                    setData={setData}
                    processing={processing} 
                    errors={errors}
                    mode={mode}
                    closeModal={handleDialogToggle}
                    reset={reset}
                    clearErrors={clearErrors}
                    isOpen={modalCrud}
                />
            </Dialog>
            <div className="min-h-screen p-4 flex-1 overflow-hidden bg-background shadow-sm rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <div className="flex flex-1">
                    <Heading
                        title="Rincian Belanja"
                        description="Kelola data rincian belanja pada tabel dibawah ini."
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
                            value={valuesActions.load === '' ? filtered.load : valuesActions.load} 
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
                            <InputGroupInput id='cari' name='cari' value={valuesActions.cari} onChange={handleInputCari} placeholder="Cari..." />
                                <InputGroupAddon>
                                    <Search />
                                </InputGroupAddon>
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
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-17 text-center">No</TableHead>
                        <TableHead className="w-32">Jenis Belanja</TableHead>
                        <TableHead className="w-40">Kode Rincian Belanja</TableHead>
                        <TableHead>Nama Rincian Belanja</TableHead>
                        <TableHead className="w-40 text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rincianbelanjas.data.length > 0 ?
                            rincianbelanjas.data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{item.jenis_belanja}</TableCell>
                                    <TableCell>{item.kode_rincian_belanja}</TableCell>
                                    <TableCell>{item.nama_rincian_belanja}</TableCell>
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
                        {rincianbelanjas.meta.from} sampai {rincianbelanjas.meta.to} dari total: {rincianbelanjas.meta.total}
                    </div>
                    <div className="flex flex-1 flex-row-reverse">
                        <Pagination links={rincianbelanjas.links} meta={rincianbelanjas.meta} />
                    </div>
                </div>
            </div>
        </>
    );
}

MainRincianBelanja.layout = (page: React.ReactNode) => (
    <AppLayout>
        <LayoutDataPendukung children={page} />
    </AppLayout>
)