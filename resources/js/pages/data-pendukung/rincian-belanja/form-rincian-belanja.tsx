import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import rincianBelanja from "@/routes/rincian-belanja";
import { router, usePage } from "@inertiajs/react";
import { AlertTriangleIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface JenisBelanja {
    id: string;
    nama_jenis_belanja: string;
}

interface JenisBelanjaProps {
    jenisbelanjas: JenisBelanja[];
    [key: string]: unknown;
}

interface FormProps{
    data: Record<string, any>;
    setData: (name: string, value: any) => void;
    post: (url: string, value: any) => void;
    put: (url: string, value: any) => void;
    processing: boolean;
    errors: Record<string, string>;
    mode: string;
    closeModal: (open: boolean) => void;
    reset: () => void;
    clearErrors: () => void;
    isOpen: boolean;
}

interface FlashProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string
    }
}

function DialogFormRincianBelanja({ 
    data, 
    setData, 
    post,
    put,
    processing, 
    errors, 
    mode,
    closeModal,
    reset,
    clearErrors,
    isOpen
}: FormProps) {
    
    const { jenisbelanjas } = usePage<JenisBelanjaProps>().props;

    const [daftarJenisBelanja, setJenisBelanja] = useState<JenisBelanja[]>([]);

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        switch (mode) {
        case 'update':
            put(rincianBelanja.update(`${data.slug}`).url, {
                preserveScroll: true,
                onSuccess: (response: { props: FlashProps }) => {
                    closeModal(false);
                    if (response.props.flash?.type === 'success') {
                        toast.success(response.props.flash?.message);
                    } else if (response.props.flash?.type === 'error') {
                        toast.error(response.props.flash?.message);
                    } else {
                        toast.info(response.props.flash?.message);
                    }
                },
            });

            break;
        
        case 'destroy':
            router.delete(rincianBelanja.destroy(`${data.slug}`).url, {
                preserveScroll: true,
                onSuccess: (response: { props: FlashProps }) => {
                    closeModal(false);
                    if (response.props.flash?.type === 'success') {
                        toast.success(response.props.flash?.message);
                    } else if (response.props.flash?.type === 'error') {
                        toast.error(response.props.flash?.message);
                    } else {
                        toast.info(response.props.flash?.message);
                    }
                },
            });

            break;
        default:
            post(rincianBelanja.store().url, {
                preserveScroll: true,
                onSuccess: (response: { props: FlashProps }) => {
                    reset();
                    clearErrors();
                    if (response.props.flash?.type === 'success') {
                        toast.success(response.props.flash?.message);
                    } else if (response.props.flash?.type === 'error') {
                        toast.error(response.props.flash?.message);
                    } else {
                        toast.info(response.props.flash?.message);
                    }
                },
            });

            break;
        }
    };

    useEffect(() => {
        if (isOpen) {
            setJenisBelanja(jenisbelanjas);
        } else {
          clearErrors();
          setJenisBelanja([]);
        }
    
      }, [isOpen]);

  return (
      <>
        {mode === 'create' || mode === 'update' ? (
            <DialogContent 
                className="sm:max-w-md" 
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
            >
                <DialogHeader>
                    <DialogTitle>{mode === 'update' ? 'Update' : 'Tambah'}</DialogTitle>
                    <DialogDescription>
                        {mode === 'update' ? 
                        'Ubah form dibawah ini untuk mengedit rincian belanja.' 
                        : 
                        'Isi form dibawah ini untuk menambah rincian belanja baru.'
                        }
                        
                    </DialogDescription>
                </DialogHeader>
            
                <form onSubmit={onFormSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Select 
                                name="jenis_belanja_id"
                                value={`${data.jenis_belanja_id}`}
                                onValueChange={(e) => setData('jenis_belanja_id', e)}
                                required
                            >
                                <SelectTrigger id='jenis_belanja_id' tabIndex={1} className="w-full" autoFocus>
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    {daftarJenisBelanja.map((item, index) => (
                                        <SelectItem key={index} value={`${item.id}`}>{item.nama_jenis_belanja}</SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.jenis_belanja_id}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="kode_rincian_belanja">Kode</Label>
                            <Input 
                                id="kode_rincian_belanja" 
                                name="kode_rincian_belanja" 
                                tabIndex={2}
                                value={data.kode_rincian_belanja || ''}
                                onChange={(e) => setData('kode_rincian_belanja', e.target.value)}
                                required
                            />
                            <InputError
                                message={errors.kode_rincian_belanja}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nama_rincian_belanja">Nama Rincian Belanja</Label>
                            <Input 
                                id="nama_rincian_belanja" 
                                name="nama_rincian_belanja" 
                                tabIndex={3}
                                value={data.nama_rincian_belanja || ''}
                                onChange={(e) => setData('nama_rincian_belanja', e.target.value)}
                                required
                            />
                            <InputError
                                message={errors.nama_rincian_belanja}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {processing ? (
                            <>
                            <Spinner />
                            <i className="text-sm text-muted-foreground">menyimpan...</i>
                            </>
                            ) : null
                        }
                        <DialogClose asChild tabIndex={4}>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button 
                            type="submit"
                            tabIndex={5}
                            disabled={processing}
                        >
                            {mode === 'update' ? 'Update' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        ): (
            <DialogContent className="sm:max-w-lg"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <DialogHeader>
                    <DialogTitle>Konfirmasi !</DialogTitle>
                    <DialogDescription>
                        Anda yakin <span className="text-foreground font-medium">{data.nama_rincian_belanja}</span> akan dihapus ?<br /> 
                        Data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogFooter>
                    <DialogClose asChild tabIndex={1} autoFocus>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" tabIndex={2} onClick={onFormSubmit}>
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        )}
      </>
  );
}

export { DialogFormRincianBelanja }