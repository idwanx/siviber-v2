import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
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
import { Edit2Icon, Trash } from 'lucide-react';
import jenisBerkas from '@/routes/jenis-berkas';
import { Dialog } from '@/components/ui/dialog';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import LayoutDataPendukung from '../layout-data-pendukung';
import { DialogFormJenisBerkas } from './form-jenis-berkas';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Data Pendukung', href: '#' },
    { title: 'Jenis Berkas', href: jenisBerkas.index().url },
];

interface FieldData {
    nama_jenis_berkas: string
    slug: string
}

interface FieldDataProps {
    jenisberkas: FieldData[];
}

export default function MainJenisBerkas({ jenisberkas }: FieldDataProps) {
    const [modalCrud, setModalCrud] = useState<boolean>(false);
    const [mode, setMode] = useState<'create' | 'update' | 'destroy'>('create');

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm<FieldData>({
        nama_jenis_berkas: '',
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

    return (
        <>
            <Head title="Jenis SPM" />
            <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
            <Dialog open={modalCrud}  onOpenChange={handleDialogToggle}>
                <DialogFormJenisBerkas
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
                />
            </Dialog>
            <div className="min-h-screen p-4 flex-1 overflow-hidden bg-background shadow-sm rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <div className="flex flex-1">
                    <Heading
                        title="Jenis Berkas"
                        description="Kelola data jenis berkas pada tabel dibawah ini."
                    />
                    <div className="ml-auto">
                        <Button onClick={() => openModalCrud('create')}>Tambah</Button>
                    </div>
                </div>
                <Separator className="mb-4" />
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-20 text-center">No</TableHead>
                        <TableHead>Nama Jenis Berkas</TableHead>
                        <TableHead className="w-40 text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jenisberkas.length > 0 ?
                            jenisberkas.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{item.nama_jenis_berkas}</TableCell>
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
            </div>
        </>
    );
}

MainJenisBerkas.layout = (page: React.ReactNode) => (
    <AppLayout>
        <LayoutDataPendukung children={page} />
    </AppLayout>
)