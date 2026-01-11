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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import penerima from "@/routes/penerima";
import { router } from "@inertiajs/react";
import { AlertTriangleIcon } from "lucide-react";
import { toast } from "sonner";

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
}

interface FlashProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string
    }
}

function DialogFormPenerima({ 
    data, 
    setData, 
    post,
    put,
    processing, 
    errors, 
    mode,
    closeModal,
    reset,
    clearErrors
}: FormProps) {

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        switch (mode) {
        case 'update':
            put(penerima.update(data.id).url, {
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
            router.delete(penerima.destroy(data.id).url, {
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
            post(penerima.store().url, {
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
                        'Ubah form dibawah ini untuk mengedit penerima.' 
                        : 
                        'Isi form dibawah ini untuk menambah penerima baru.'
                        }
                        
                    </DialogDescription>
                </DialogHeader>
            
                <form onSubmit={onFormSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nama_penerima">Nama Penerima</Label>
                            <Input 
                                id="nama_penerima" 
                                name="nama_penerima" 
                                tabIndex={1}
                                value={data.nama_penerima || ''}
                                onChange={(e) => setData('nama_penerima', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError
                                message={errors.nama_penerima}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="norek">No. Rekening</Label>
                            <Input 
                                id="norek" 
                                name="norek" 
                                tabIndex={2}
                                value={data.norek || ''}
                                onChange={(e) => setData('norek', e.target.value)}
                                required
                            />
                            <InputError
                                message={errors.norek}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="npwp">Npwp</Label>
                            <Input 
                                id="npwp" 
                                name="npwp" 
                                tabIndex={3}
                                value={data.npwp || ''}
                                onChange={(e) => setData('npwp', e.target.value)}
                                required
                            />
                            <InputError
                                message={errors.npwp}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="alamat">Alamat</Label>
                            <Input 
                                id="alamat" 
                                name="alamat" 
                                tabIndex={4}
                                value={data.alamat || ''}
                                onChange={(e) => setData('alamat', e.target.value)}
                                required

                            />
                            <InputError
                                message={errors.alamat}
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
                        <DialogClose asChild>
                            <Button variant="outline" tabIndex={5}>Batal</Button>
                        </DialogClose>
                        <Button 
                            type="submit"
                            tabIndex={6}
                            disabled={processing}
                        >{mode === 'update' ? 'Update' : 'Simpan'}</Button>
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
                        Anda yakin instansi <span className="text-foreground font-medium">{data.nama_instansi}</span> akan dihapus ?<br />
                        Data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={onFormSubmit}>
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        )}
      </>
  );
}

export { DialogFormPenerima }