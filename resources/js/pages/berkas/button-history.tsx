import { useState } from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FieldDataBerkas } from "@/types/berkas";
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
