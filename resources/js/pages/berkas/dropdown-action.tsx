import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Printer, Trash2 } from "lucide-react";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from './Print.module.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LembarVerifikasi } from "./lembar-verifikasi";
import { ModeType } from "@/types/berkas";
import { User } from "@/types";

interface SelectProps {
  user: User;
  openModalCrud: (mode: ModeType, item: number) => void;
  openDialogDestroy: (item: number) => void;
  openDialogDetail: (item: number) => void;
  dataValue: number;
}

export default function DropDownPilihan({ user, openModalCrud, openDialogDestroy, openDialogDetail, dataValue }: SelectProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <>
    <LembarVerifikasi ref={componentRef} data={dataValue} />
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

            <DropdownMenuItem onClick={handlePrint}>
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