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
import { FieldDataBerkas, StatusType } from "@/types/berkas";
import { AlertTriangleIcon } from "lucide-react";

interface BerkasProps {
    dataValue: FieldDataBerkas;
    handleAction: (berkasValue: FieldDataBerkas, newStatus: StatusType) => void;
    busy: boolean;
}

export default function DialogBatalSp2d({ dataValue, handleAction, busy } : BerkasProps) {
  
  return (
    <>
    <DialogContent 
      onInteractOutside={(e) => {
          e.preventDefault();
      }}
      className="sm:max-w-lg">
        <div className="flex items-start space-x-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
            <AlertTriangleIcon className="h-6 w-6 text-orange-500" />
          </div>
          <DialogHeader>
            <DialogTitle>Konfirmasi !</DialogTitle>
            <DialogDescription>
              Apakah anda yakin berkas SP2D:<br />
              Kegiatan:{' '}{dataValue?.kegiatan}<br />
              No. SPM:{' '}{dataValue?.no_spm}<br />
              akan dibatalkan ?
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="items-center">
          {busy ? (
            <>
              <Spinner />
              <i className="text-sm text-muted-foreground">membatalkan...</i>
            </>
          ):('')}
          <DialogClose asChild>
            <Button variant="outline" tabIndex={1}>Tidak</Button>
          </DialogClose>
          <Button 
            className="bg-orange-500 hover:bg-orange-400"
            type="button" 
            tabIndex={1}
            onClick={() => handleAction(dataValue, 4)}
            disabled={busy}
            autoFocus
          >
            Ya, Batalkan
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </>
  );
}