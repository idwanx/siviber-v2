import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import berkas from "@/routes/berkas";
import { useCallback, useEffect, useState } from "react";

const tabs = [
  {
    name: "Info",
    value: "home",
  },
  {
    name: "Rincian Belanja",
    value: "profile",
  },
  // {
  //   name: "Dokumen",
  //   value: "messages",
  // },
  // {
  //   name: "Settings",
  //   value: "settings",
  // },
];

interface BerkasProps {
    isDialog: boolean;
    dataState: number;
    closeModal: (open: boolean) => void;
}

export default function DialogDetailBerkas({ isDialog, dataState, closeModal } : BerkasProps) {
  const [dataBerkas, setDataBerkas] = useState();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const getDetailBerkas = useCallback(async (id: number): Promise<void> => {
    setIsLoadingUpdate(true);
      try {
          const response = await fetch(berkas.detail(id).url);
          const result: any = await response.json();
          setDataBerkas(result);
          setIsLoadingUpdate(false);
      } catch (error) {
          setIsLoadingUpdate(false);
          throw error;
      }
  }, []);

  useEffect(() => {
    getDetailBerkas(dataState);
    return () => {
        isDialog;
    }
  }, [isDialog]);

  return (
    <DialogContent 
          className="p-0 sm:max-w-3xl 2xl:max-w-4xl"
          onInteractOutside={(e) => {
              e.preventDefault();
          }}
        >
          <DialogHeader className="px-6 pt-4">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Detail Berkas
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
              <div className="xl:max-h-120 max-h-80 mx-4">
                <Tabs 
                  defaultValue="info"
                  orientation="vertical"
                  className="w-full flex flex-row items-start gap-4"
                >
                  <TabsList className="shrink-0 grid grid-cols-1 h-auto w-fit gap-1 p-2">
                    <TabsTrigger value="info" className="py-1.5">Info</TabsTrigger>
                    <TabsTrigger value="rincian" className="py-1.5">Rincian</TabsTrigger>
                  </TabsList>
                  <div className="h-40 flex w-full border rounded-md text-sm p-2">
                      <TabsContent
                        value="info"
                        className="flex h-full"
                      >
                        ------
                      </TabsContent>
                      <TabsContent
                        value="rincian"
                        className="flex h-full"
                      >
                        ------
                      </TabsContent>
                  </div>
                </Tabs>
              </div>
            <div className="flex border-t bg-muted rounded-b-md px-4 py-4">
              <div className="ml-auto">
                <DialogClose asChild>
                  <Button variant="outline" tabIndex={3}>Tutup</Button>
                </DialogClose>
              </div>
            </div>

        </DialogContent>
  );
}