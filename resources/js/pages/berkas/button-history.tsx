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
import { FieldDataBerkas, Riwayats } from "./types";
import berkas from "@/routes/berkas";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

interface DialogProps {
    dataValue: FieldDataBerkas;
}

export default function ButtonHistory({ dataValue } : DialogProps) {
  const { auth } = usePage<SharedData>().props;
  const getInitials = useInitials();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [daftarHistory, setDaftarHistory] = useState<Riwayats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenSheet = () => {
    setSheetOpen(true);
  };

  const handleSheetToggle = (sheetIsOpen: boolean) => {
      setSheetOpen(sheetIsOpen);
  };

  const fetchHistory = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
        const response = await fetch(berkas.gethistory(dataValue.id).url);
        const result: Riwayats[] = await response.json();
        setDaftarHistory(result);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
  }, []);

  useEffect(() => {
    
    fetchHistory();

    return () => {
        sheetOpen;
    }

  }, [sheetOpen]);

    return (
        <Sheet open={sheetOpen} onOpenChange={handleSheetToggle}>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleOpenSheet} 
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 text-muted-foreground"
                    >
                        <History />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Riwayat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Riwayat Berkas</SheetTitle>
              <SheetDescription>
                {dataValue.kegiatan}
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min overflow-y-auto p-4">
              <div className="relative">
                {isLoading ? (
                  <div className="flex gap-2 items-center text-sm text-foreground"><Spinner />Loading...</div>
                ): (
                  daftarHistory.map((history, index) => (
                    <div key={index} className="flex space-x-4">
                      <Avatar className="h-9 w-9 overflow-hidden rounded-full">
                        {history.foto ? 
                        <AvatarImage src={`/storage/${history.foto}`} alt={auth.user.name} />
                        :
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(history.name!)}
                        </AvatarFallback>
                        }
                      </Avatar>
                      <div className="min-w-0 flex-1">
                          <span aria-hidden="true" className="absolute inset-0" />
                          <div className="text-sm font-medium text-foreground">
                            {history.name}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <div>
                              {history.created_at}
                            </div>
                            <div className="ml-auto">
                              {history.jam}
                            </div>
                          </div>
                          <div className="mt-2 truncate text-sm text-green-600">
                            {history.status_berkas} berkas
                          </div>
                        {index < daftarHistory.length - 1 && (
                          <div className="py-2"><Separator /></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <SheetFooter>
              
            </SheetFooter>
          </SheetContent>
        </Sheet>
    )
}
