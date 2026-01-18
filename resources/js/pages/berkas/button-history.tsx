import { useInitials } from "@/hooks/use-initials";
import { useCallback, useEffect, useState } from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import berkas from "@/routes/berkas";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { FieldDataBerkas, Riwayats } from "@/types/berkas";
import SheetHistory from "./sheet-history";

interface DialogProps {
    dataValue: FieldDataBerkas;
}

export default function ButtonHistory({ dataValue } : DialogProps) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const handleOpenSheet = () => {
    setSheetOpen(true);
  };

  const handleSheetToggle = (sheetIsOpen: boolean) => {
    setSheetOpen(sheetIsOpen);
  };

    return (
        <Sheet open={sheetOpen} onOpenChange={handleSheetToggle}>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleOpenSheet} 
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 text-muted-foreground"
                        tabIndex={8}
                    >
                        <History />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Riwayat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <SheetHistory sheetOpen={sheetOpen} dataValue={dataValue} />
        </Sheet>
    )
}
