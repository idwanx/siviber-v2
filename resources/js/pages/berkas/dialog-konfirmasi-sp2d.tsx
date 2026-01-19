import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import berkas from "@/routes/berkas";
import { FieldDataBerkas, StatusType } from "@/types/berkas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitials } from "@/hooks/use-initials";

interface DialogProps {
    dialogOpen: boolean;
    dataValue: FieldDataBerkas;
    handleAction: (berkasId: number, newStatus: StatusType) => void;
    busy: boolean;
}

interface CekVerifikatorKonfirmasi {
    foto: string;
    id: number;
    name: string;
    jumlah_riwayat: number;
}

export default function DialogKonfirmasiSp2d({ 
  dialogOpen, 
  dataValue,
  handleAction,
  busy
} : DialogProps) {

  const [daftarVerifikator, setDaftarVerifikator] = useState<CekVerifikatorKonfirmasi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getInitials = useInitials();

  const getVerifikator = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
        const response = await fetch(berkas.getverifikator(dataValue.id).url);
        const result: CekVerifikatorKonfirmasi[] = await response.json();
        setDaftarVerifikator(result);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
  }, []);

  useEffect(() => {
    if (dialogOpen) {
        getVerifikator();
    } else {
      return () => setDaftarVerifikator([]);
    }
    
  }, [dialogOpen]);

  return (
      <>
        <DialogContent 
          className="p-0 sm:max-w-xl 2xl:max-w-2xl top-0 mt-6 translate-y-0"
          onInteractOutside={(e) => {
              e.preventDefault();
          }}
        >
          <DialogHeader className="px-6 pt-4">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Konfirmasi SP2D
            </DialogTitle>
            <DialogDescription>
              Kegiatan:{' '}{dataValue.kegiatan}<br />
              No. SPM:{' '}{dataValue.no_spm}
            </DialogDescription>
          </DialogHeader>
          <div className="2xl:max-h-100 max-h-80 overflow-y-auto mx-4 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Verifikator</TableHead>
                    <TableHead className="w-40 text-center">Cek</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4}><div className="flex gap-2 items-center"><Spinner />Loading...</div></TableCell>
                    </TableRow>
                  ) : (
                    daftarVerifikator.length > 0 ? (
                      daftarVerifikator.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className={`whitespace-normal font-medium'}`}>
                            <div key={index} className="flex items-center space-x-3">
                              <Avatar className="h-9 w-9 overflow-hidden rounded-full">
                                {item.foto ?
                                <AvatarImage src={`/storage/foto/small/${item.foto}`} alt={item.name} />
                                :
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(item.name)}
                                </AvatarFallback>
                                }
                              </Avatar>
                              <div className="text-sm font-medium text-foreground">
                                {item.name}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {item.jumlah_riwayat > 0 ? (
                              <div  className="flex justify-center">
                                <Check size={23} className="text-foreground" />
                              </div>
                            ):(<span className="text-muted-foreground">Belum verifikasi</span>)}
                          </TableCell>
                        </TableRow>
                      ))
                    ):(
                      <TableRow>
                        <TableCell colSpan={2}>Tidak ada data.</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
          </div>
            <div className="border-t bg-muted dark:bg-background rounded-b-md px-4 py-4">
              <div className="flex justify-between gap-2 flex-col-reverse sm:flex-row">
                <span className="text-sm text-foreground">
                  Jika tetap akan melanjutkan ke status berkas Sp2d maka klik tombol Sp2d, jika tidak klik tombol batal.
                </span>
                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button 
                      variant={"default"}
                      type="button" 
                      tabIndex={1}
                      onClick={() => handleAction(dataValue.id, 4)}
                      disabled={busy}
                      autoFocus
                    >
                      Sp2d
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" tabIndex={2}>Batal</Button>
                    </DialogClose>
                </div>
              </div> 
            </div>
        </DialogContent>
      </>
  );
}