import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner";
import catatan from "@/routes/catatan";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import { CatatanMap } from "@/types/berkas";

interface DialogProps {
    dialogOpen: boolean;
    dataValue: any;
}

export default function DialogCatatanView({ 
  dialogOpen, 
  dataValue,
} : DialogProps) {
  const getInitials = useInitials();
  const [daftarCatatan, setDaftarCatatan] = useState<CatatanMap[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const getCatatan = useCallback(async (berkasId: number): Promise<void> => {
    setIsLoading(true);
      try {
          const response = await fetch(catatan.index(berkasId).url);
          const result: CatatanMap[] = await response.json();
          setDaftarCatatan(result);
          setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          throw error;
      }
  }, []);

  const CheckBoxItem = ({ itemCatatan } : { itemCatatan: CatatanMap }) => {
      return (
          <Checkbox
            id={itemCatatan.id}
            checked={itemCatatan.is_okey_new === undefined ? itemCatatan.is_okey : itemCatatan.is_okey_new}
            onCheckedChange={undefined}
          />
      )
  };

  const addNewCatatan = (newCatatan: CatatanMap) => {
    setDaftarCatatan([...daftarCatatan, {
      id: newCatatan.id,
      berka_id: newCatatan.berka_id,
      catatan: newCatatan.catatan,
      created_at: newCatatan.created_at,
      foto: newCatatan.foto,
      name: newCatatan.name,
      is_okey: newCatatan.is_okey,
      user_id: newCatatan.user_id
    }]);
    setHasUpdated(true);
  };

  const updateNewCatatan = (newCatatan: CatatanMap) => {
    setDaftarCatatan(prevItems =>
        prevItems.map(item =>
            item.id === newCatatan.id ? { ...item, catatan: newCatatan.catatan, created_at: newCatatan.created_at } : item
        )
    );
  };

  const destroyCatatan = (idToDelete: string) => {
    setDaftarCatatan(
      daftarCatatan.filter(item => 
        item.id !== idToDelete
      )
    );
  };

  useEffect(() => {
    if (dialogOpen) {
        getCatatan(dataValue.berka_id);
    }

    return () => {
        dialogOpen;
    }
    
  }, [dialogOpen]);

  useEffect(() => {
    if (dataValue) {
      switch (dataValue.action) {
      case 'addcatatan':
          addNewCatatan(dataValue);
          break;
      case 'updatecatatan':
          updateNewCatatan(dataValue);
          break;
      case 'destroycatatan':
          destroyCatatan(dataValue.id);
          break;
      default:
          return () => { daftarCatatan; }
      }
    } else {
        return () => { daftarCatatan; }
    }

    return () => { daftarCatatan; }

  }, [dataValue]);

   useEffect(() => {
    if (hasUpdated) {
      scrollToBottom();
    }
  }, [hasUpdated]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    setHasUpdated(false);
  };

  return (
      <>
        <DialogContent 
          className="p-0 sm:max-w-3xl 2xl:max-w-4xl top-0 mt-6 translate-y-0"
          onInteractOutside={(e) => {
              e.preventDefault();
          }}
        >
          <DialogHeader className="px-6 pt-4">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Daftar Catatan
            </DialogTitle>
            <DialogDescription>
              Kegiatan:{' '}{dataValue?.kegiatan}<br />
              No. SPM:{' '}{dataValue?.no_spm}
            </DialogDescription>
          </DialogHeader>
          <div ref={scrollRef} className="xl:max-h-120 max-h-80 overflow-y-auto mx-4 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-7">
                        {/* <Checkbox id="terms" className="bg-background" /> */}
                    </TableHead>
                    <TableHead>Catatan</TableHead>
                    <TableHead className="w-64">Verifikator</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4}><div className="flex gap-2 items-center"><Spinner />Loading...</div></TableCell>
                    </TableRow>
                  ) : (
                    daftarCatatan.length > 0 ? (
                      daftarCatatan.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <CheckBoxItem itemCatatan={item}/>
                          </TableCell>
                          <TableCell className="whitespace-normal">
                            {item.catatan}
                          </TableCell>
                          <TableCell>
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
                        </TableRow>
                      ))
                    ):(
                      <TableRow>
                        <TableCell colSpan={3}>Tidak catatan.</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
          </div>
            <div className="flex border-t bg-muted dark:bg-background rounded-b-md px-4 py-4">
              <div className="ml-auto">
                <DialogClose asChild>
                  <Button variant="outline" tabIndex={1} autoFocus>Tutup</Button>
                </DialogClose>
              </div>
            </div>

        </DialogContent>
      </>
  );
}

