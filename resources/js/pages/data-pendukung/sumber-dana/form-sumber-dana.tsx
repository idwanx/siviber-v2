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
import sumberDana from "@/routes/sumber-dana";
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

function DialogFormSumberDana({ 
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
            put(sumberDana.update(`${data.slug}`).url, {
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
            router.delete(sumberDana.destroy(`${data.slug}`).url, {
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
            post(sumberDana.store().url, {
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
                        'Ubah form dibawah ini untuk mengedit status berkas.' 
                        : 
                        'Isi form dibawah ini untuk menambah status berkas baru.'
                        }
                    </DialogDescription>
                </DialogHeader>
            
                <form onSubmit={onFormSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                        <Label htmlFor="nama_sumber_dana">Nama Sumber Dana</Label>
                        <Input 
                            id="nama_sumber_dana" 
                            name="nama_sumber_dana" 
                            tabIndex={1}
                            value={data.nama_sumber_dana || ''}
                            onChange={(e) => setData('nama_sumber_dana', e.target.value)}
                            required
                            autoFocus
                        />
                        <InputError
                            message={errors.nama_sumber_dana}
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
                            <Button variant="outline" tabIndex={2}>Batal</Button>
                        </DialogClose>
                        <Button 
                            type="submit"
                            tabIndex={3}
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
                        Anda yakin <span className="text-foreground font-medium">{data.nama_sumber_dana}</span> akan dihapus ?<br />
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

export { DialogFormSumberDana }