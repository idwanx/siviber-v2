import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import berkas from "@/routes/berkas";
import { FlashProps } from "@/types/berkas";
import { router } from "@inertiajs/react";
import { AlertTriangleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BerkasProps {
    dataState?: number;
    closeModal: (open: boolean) => void;
    destroyBerkas: (data: any) => void;
}

export default function DialogDestroy({ dataState, closeModal, destroyBerkas } : BerkasProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDestroy = (dataState: number) => {
    setIsLoading(true);
    router.delete(berkas.destroy(dataState).url, {
        preserveScroll: true,
        onSuccess: (response: { props: FlashProps }) => {
          const dataDestroy: any = response.props.newdata?.datas;
            destroyBerkas(dataDestroy.id);
            closeModal(false);
            setIsLoading(false);
            if (response.props.flash?.type === 'success') {
                toast.success(response.props.flash?.message, {
                  position: 'top-right',
                  style: {
                    '--normal-bg':
                      'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                  } as React.CSSProperties
                });
            } else if (response.props.flash?.type === 'error') {
                toast.error(response.props.flash?.message, {
                  position: 'top-right',
                  style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                  } as React.CSSProperties
                });
            } else {
                toast.warning(response.props.flash?.message, {
                  position: 'top-right',
                  style: {
                    '--normal-bg': 'var(--background)',
                    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
                  } as React.CSSProperties
                });
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
        <DialogFooter className="items-center">
          {isLoading ? (
            <>
              <Spinner />
              <i className="text-sm text-muted-foreground">menghapus...</i>
            </>
          ):('')}
          <DialogClose asChild>
            <Button variant="outline" tabIndex={10}>Batal</Button>
          </DialogClose>
          <Button variant="destructive" disabled={isLoading ? true : false} type="button" onClick={() => onDestroy(dataState!)}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </>
  );
}