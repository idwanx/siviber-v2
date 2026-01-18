import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Printer, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { LembarVerifikasi } from "./lembar-verifikasi";
import { FieldDataBerkas, ModeType } from "@/types/berkas";
import { User } from "@/types";
import berkas from "@/routes/berkas";

interface SelectProps {
  user: User;
  openModalCrud: (mode: ModeType, item: number) => void;
  openDialogDestroy: (item: number) => void;
  openDialogDetail: (item: number) => void;
  dataValue: number;
}

export default function DropDownPilihan({ user, openModalCrud, openDialogDestroy, openDialogDetail, dataValue }: SelectProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [dataBerkas, setDataBerkas] = useState<FieldDataBerkas | null>(null);

  const handlePrint = (id: number) => {
    getDetailBerkas(id)
  };

  const handleAfterPrint = () => {
    setDataBerkas(null);
  };

  const printing = useReactToPrint({
    contentRef: componentRef,
    onAfterPrint: handleAfterPrint,
  });

  const getDetailBerkas = useCallback(async (idBerkas: number): Promise<void> => {
      try {
          const response = await fetch(berkas.find(idBerkas).url);
          const result: any = await response.json();
          setDataBerkas(result);

      } catch (error) {
          throw error;
      }
  }, []);


  useEffect(() => {
    if (dataBerkas) {
      printing();
    }

    return () => {
        setDataBerkas(null);
    }

  }, [dataBerkas]);

  return (
    <>
      <LembarVerifikasi ref={componentRef} data={dataBerkas} />
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openDialogDetail(dataValue)}>
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handlePrint(dataValue)}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </DropdownMenuItem>
            {user.roleuser.slug === 'bendahara' && (
              <>
              <DropdownMenuItem onClick={() => openModalCrud("edit", dataValue)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => openDialogDestroy(dataValue)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}