import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotebookPen } from "lucide-react";
import DialogCatatan from "./dialog-catatan";
import { Dialog } from "@/components/ui/dialog";
import { User } from "@/types";
import { FieldDataBerkas, UpdateJumlahCatatan } from "@/types/berkas";

interface DialogProps {
    updateJumlahCatatan: (data: UpdateJumlahCatatan) => void;
    dataValue: FieldDataBerkas;
    user: User;
    stateCatatans: any | null;
}

export default function ButtonCatatan({ user, updateJumlahCatatan, dataValue, stateCatatans}: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
      setDialogOpen(true);
  };

  const handleDialogToggle = (dialogIsOpen: boolean) => {
      setDialogOpen(dialogIsOpen);
  };
  
  return (
      <>
        <Dialog open={dialogOpen}  onOpenChange={handleDialogToggle}>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleOpenDialog} 
                        variant="ghost"
                        size="sm"
                        className="h-7 text-muted-foreground"
                        tabIndex={9}
                    >
                        <NotebookPen />
                        <span className="text-destructive">{dataValue.jumlah_catatan}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Catatan</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogCatatan 
            dialogOpen={dialogOpen} 
            user={user}
            updateJumlahCatatan={updateJumlahCatatan} 
            dataValue={dataValue}
            stateCatatans={stateCatatans}
          />
        </Dialog>
      </>
  );
}