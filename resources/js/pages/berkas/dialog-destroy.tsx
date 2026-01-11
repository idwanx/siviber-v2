import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import berkas from "@/routes/berkas";
import { router } from "@inertiajs/react";
import { AlertTriangleIcon } from "lucide-react";
import { toast } from "sonner";

interface BerkasProps {
    dataState?: number;
    closeModal: (open: boolean) => void;
    destroyBerkas: (data: any) => void;
}

interface FlashProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string
    }
}

export default function DialogDestroy({ dataState, closeModal, destroyBerkas } : BerkasProps) {
  const onDestroy = (dataState: number) => {
    router.delete(berkas.destroy(dataState).url, {
        preserveScroll: true,
        onSuccess: (response: { props: FlashProps }) => {
          const dataDestroy: any = response.props.newdata?.datas;
            destroyBerkas(dataDestroy.id);
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
  };
  
  return (
    <>
    <DialogContent 
      onInteractOutside={(e) => {
          e.preventDefault();
      }}
      className="sm:max-w-lg">
        <div className="flex items-start space-x-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <DialogHeader>
            <DialogTitle>Konfirmasi</DialogTitle>
            <DialogDescription>
              Apakah anda yakin berkas akan dihapus?.<br />
              Data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" tabIndex={10}>Batal</Button>
          </DialogClose>
          <Button variant="destructive" type="button" onClick={() => onDestroy(dataState!)}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </>
  );
}