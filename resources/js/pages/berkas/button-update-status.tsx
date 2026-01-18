import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Check, CircleCheckBig, CircleSlash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import berkas from "@/routes/berkas";
import DialogKonfirmasiSp2d from "./dialog-konfirmasi-sp2d";
import { Dialog } from "@/components/ui/dialog";
import { FieldDataBerkas, FlashProps, Riwayats, StatusType } from "@/types/berkas";

interface ActionProps {
    updateStatusBerkas: (newData: any) => void;
    dataValue: FieldDataBerkas;
}

export default function ButtonUpdateStatus({ updateStatusBerkas, dataValue }: ActionProps) {
    const { auth } = usePage<SharedData>().props;
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [pendingAction, setPendingAction] = useState<{
        id: number;
        type: StatusType;
    } | null>(null);

    const isAdminVerifikator: boolean = auth.user.roleuser.slug === "admin" || auth.user.roleuser.slug === "verifikator";
    const isTaskActionPending = (action: StatusType, taskId: number) => pendingAction?.id === taskId && pendingAction.type === action;
    const isTaskBusy = (taskId: number) => pendingAction?.id === taskId;
    const verifikasiPending = isTaskActionPending(2, dataValue.id);
    const penolakanPending = isTaskActionPending(3, dataValue.id);
    const sp2dPending = isTaskActionPending(4, dataValue.id);

    const busy = isTaskBusy(dataValue.id);

    const handleAction = (berkasId: number, newStatus: StatusType) => {

        setPendingAction({ id: dataValue.id, type: newStatus });

        router.post(berkas.addriwayat(berkasId), { berkasid: berkasId, statusberkas: newStatus }, {
            preserveScroll: true,
            onSuccess: (response: { props: FlashProps }) => {
                if (response.props.flash?.type === 'success') {
                    const newData: any = response.props.newdata?.datas;
                    updateStatusBerkas(newData);
                    setPendingAction(null);
                    toast.success(response.props.flash?.message);
                    dialogIsOpen ? setDialogIsOpen(!dialogIsOpen) : setDialogIsOpen(false)
                } else if (response.props.flash?.type === 'error') {
                    toast.error(response.props.flash?.message);
                    setPendingAction(null);
                } else {
                    toast.info('Beritahu admin terkait kesalahan ini.');
                    setPendingAction(null);
                }
            },
            onError: () => {
                toast.error('terjadi kessalahan, hubungi admin');
                setPendingAction(null);
            },
        });
    };

    const ButtonVerifikasi = ({ dataRiwayat, statusBerkas } : { dataRiwayat: Riwayats[], statusBerkas: StatusType }) => {
        
        const checkUserVerifikasi: boolean = dataRiwayat.some(riwayat => riwayat.user_id === auth.user.id && riwayat.status_berka_id === 2);
       
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 w-7 ${checkUserVerifikasi ? 'bg-ring/50 dark:bg-sidebar-primary/20' : 'text-muted-foreground'}`}
                            onClick={() => handleAction(dataValue.id, 2)}
                            disabled={busy || statusBerkas === 3 || statusBerkas === 4}
                            tabIndex={10}
                        >
                            {verifikasiPending ? (
                                <Spinner />
                            ) : (
                                <Check />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Verifikasi</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    };

    const ButtonPenolakan = ({ dataRiwayat, statusBerkas } : { dataRiwayat: Riwayats[], statusBerkas: StatusType }) => {
        
        const checkUserPenolakan: boolean = dataRiwayat.some(riwayat => riwayat.user_id === auth.user.id && riwayat.status_berka_id === 3);
       
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 w-7 ${checkUserPenolakan ? 'bg-ring/50 dark:bg-sidebar-primary/20 text-muted-foreground' : 'text-muted-foreground'}`}
                            onClick={() => handleAction(dataValue.id, 3)}
                            disabled={busy || statusBerkas === 3 && !checkUserPenolakan || statusBerkas === 4}
                            tabIndex={11}
                        >
                            {penolakanPending ? (
                                <Spinner />
                            ) : (
                                <CircleSlash2 />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Penolakan</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    };

    const ButtonSp2d = ({ dataRiwayat, statusBerkas } : { dataRiwayat: Riwayats[], statusBerkas: StatusType }) => {
        
        const checkUserSp2d: boolean = dataRiwayat.some(riwayat => riwayat.user_id === auth.user.id && riwayat.status_berka_id === 4);
       
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 w-7 ${checkUserSp2d ? 'bg-ring/50 dark:bg-sidebar-primary/20' : 'text-muted-foreground'}`}
                            onClick={statusBerkas === 4 && checkUserSp2d ? () => handleAction(dataValue.id, 4) : handleKonfirmasiSp2d}
                            disabled={busy || statusBerkas === 4 && !checkUserSp2d || statusBerkas === 3}
                            tabIndex={12}
                        >
                            {sp2dPending ? (
                                <Spinner />
                            ) : (
                                <CircleCheckBig />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Sp2d</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    };

    const handleKonfirmasiSp2d = () => {
        setDialogIsOpen(true);
    };

    const handleDialogToggle = (dialogIsOpen: boolean) => {
        setDialogIsOpen(dialogIsOpen);
    };

    return (
        <>
        <Dialog open={dialogIsOpen}  onOpenChange={handleDialogToggle}>
            <DialogKonfirmasiSp2d 
                dialogOpen={dialogIsOpen} 
                dataValue={dataValue}
                handleAction={handleAction}
                busy={busy}
            />
        </Dialog>
        {isAdminVerifikator ? (
            <div className="flex ml-auto gap-1.5">
                <ButtonVerifikasi dataRiwayat={dataValue.riwayats} statusBerkas={dataValue.status_berka_id}/>
                <ButtonPenolakan dataRiwayat={dataValue.riwayats} statusBerkas={dataValue.status_berka_id} />
                <ButtonSp2d dataRiwayat={dataValue.riwayats} statusBerkas={dataValue.status_berka_id} />
            </div>
        ):(null)}
    </>
    )
}