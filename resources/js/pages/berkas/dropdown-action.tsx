import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

type ModeType = "create" | "update";

interface SelectProps {
  openModalCrud: (mode: ModeType, item: number) => void;
  openDialogDestroy: (item: number) => void;
  openDialogDetail: (item: number) => void;
  dataValue: number;
}

export default function DropDownPilihan({ openModalCrud, openDialogDestroy, openDialogDetail, dataValue }: SelectProps) {
  return (
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
          <DropdownMenuItem onClick={() => openModalCrud("update", dataValue)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={() => openDialogDestroy(dataValue)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// () => openModalCrud('destroy', item)