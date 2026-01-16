import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Edit2, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox"
import { router, useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import InputError from "@/components/input-error";
import { CatatanMap, ChekedProps, FieldDataBerkas, FlashCatatanProps, FormFieldCatatan, ModeSubmit } from "./types";
import catatan from "@/routes/catatan";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitials } from "@/hooks/use-initials";

interface DialogProps {
    dialogOpen: boolean;
    user: User;
    updateJumlahCatatan: (data: any) => void;
    dataValue: FieldDataBerkas;
    stateCatatans: any | null;
}

export default function DialogCatatan({ 
  dialogOpen, 
  user,
  updateJumlahCatatan,
  dataValue,
  stateCatatans
} : DialogProps) {
  const getInitials = useInitials();
  const [daftarCatatan, setDaftarCatatan] = useState<CatatanMap[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [submitMode, setSubmitMode] = useState<ModeSubmit>("create");
  const [onDestroy, setOnDestroy] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ChekedProps[]>([]);
  const isAdminVerifikator: boolean = user.roleuser.slug === "admin" || user.roleuser.slug === "verifikator";
  const { data, setData, post, put, delete: destroy, processing, errors, clearErrors } = useForm<FormFieldCatatan>({
      id: '',
      berka_id: 0,
      catatan: '',
  });

  const fetchCatatan = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
        const response = await fetch(catatan.index(dataValue).url);
        const result: CatatanMap[] = await response.json();
        setDaftarCatatan(result);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
  }, []);

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

  const handleEdit = (itemCatatan: FormFieldCatatan) => {
    setSubmitMode("edit");
    setData({
      id: itemCatatan.id,
      berka_id: itemCatatan.berka_id,
      catatan: itemCatatan.catatan
    });
  };
  
  const destroyCatatan = (idToDelete: string) => {
    setDaftarCatatan(
      daftarCatatan.filter(item => 
        item.id !== idToDelete
      )
    );
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: any[] = selectedItems;

    if (selectedItems.length > 0) {
      router.post(catatan.updateChecked(), { berka_id: dataValue.id, items_data: formData }, {
        preserveScroll: true,
        onSuccess: (response: { props: FlashCatatanProps }) => {
          if (response.props.flash?.type === 'success') {
            const result: CatatanMap[] = response.props.newdata?.datas;
            toast.success(response.props.flash?.message, {
              position: "top-center"
            });
            setDaftarCatatan(result);
          } else if (response.props.flash?.type === 'error') {
            toast.error(response.props.flash?.message, {
              position: "top-center"
            });
          } else {
            toast.info(response.props.flash?.message, {
              position: "top-center"
            });
          }
          setSelectedItems([]);
        },
      });
    } else {
      switch (submitMode) {
        case "edit":
          put(catatan.update(data.id).url, {
              preserveScroll: true,
              onSuccess: (response: { props: FlashCatatanProps }) => {
                if (response.props.flash?.type === 'success') {
                  updateNewCatatan(response.props.newdata?.datas);
                  toast.success(response.props.flash?.message, {
                    position: "top-center"
                  });
                } else if (response.props.flash?.type === 'error') {
                  toast.error(response.props.flash?.message, {
                    position: "top-center"
                  });
                } else {
                  toast.info(response.props.flash?.message, {
                    position: "top-center"
                  });
                }
                handleReset();
              },
          });
          break;
        default:
        post(catatan.store().url, {
            preserveScroll: true,
            onSuccess: (response: { props: FlashCatatanProps }) => {
                if (response.props.flash?.type === 'success') {
                  addNewCatatan(response.props.newdata?.datas);
                  updateJumlahCatatan(response.props.newdata?.datas);
                  toast.success(response.props.flash?.message, {
                    position: "top-center"
                  });
                } else if (response.props.flash?.type === 'error') {
                  toast.error(response.props.flash?.message, {
                    position: "top-center"
                  });
                } else {
                  toast.info(response.props.flash?.message, {
                    position: "top-center"
                  });
                }
                handleReset();
                clearErrors();
            },
        });
        break;
      }
    }
  };

  const handleDestroy = ( item: string ) => {
    destroy(catatan.destory(item).url, {
        preserveScroll: true,
        onStart: () => setOnDestroy(true),
        onSuccess: (response: { props: FlashCatatanProps }) => {
          if (response.props.flash?.type === 'success') {
              toast.success(response.props.flash?.message, {
                position: "top-center"
              });
              destroyCatatan(item);
              updateJumlahCatatan(response.props.newdata?.datas);
          } else if (response.props.flash?.type === 'error') {
              toast.error(response.props.flash?.message, {
                position: "top-center"
              });
          } else {
              toast.info(response.props.flash?.message, {
                position: "top-center"
              });
          }
          handleReset();
          clearErrors();
        },
        onFinish: () => setOnDestroy(false),
        onError: () => setOnDestroy(false)
    });
  };
  
  const handleCheckedChange = (checked: boolean, itemId: string) => {
    setData({
      ...data,
      id: '', catatan: ''
    });
    clearErrors();

    const foundItem = selectedItems.find(dataItem => dataItem.id === itemId);

    if(checked) {
      if (!foundItem) {
        setSelectedItems(prev => [
          ...prev, {
            id: itemId,
            is_okey: checked,
          }
        ]);

        setDaftarCatatan(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, is_okey_new: checked } : item
            )
        );

      } else {
        setSelectedItems(prev => prev.filter(item => item.id !== itemId));
        setDaftarCatatan(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, is_okey_new: checked } : item
            )
        );
      }
    } else {
      if (!foundItem) {
        setSelectedItems(prev => [
          ...prev, {
            id: itemId,
            is_okey: checked,
          }
        ]);

        setDaftarCatatan(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, is_okey_new: checked } : item
            )
        );
      } else {
        setSelectedItems(prev => prev.filter(item => item.id !== itemId));

        setDaftarCatatan(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, is_okey_new: checked } : item
            )
        );
      }
    }
  };

  function handleReset() {
    if (!selectedItems.length) {
      setData({
        ...data,
        id: '', catatan: ''
      });
      clearErrors();
      setSubmitMode("create");
    } else {
      setData({
        ...data,
        id: '', catatan: ''
      });
      clearErrors();
      setSubmitMode("create");
      setSelectedItems([]);
      setDaftarCatatan(daftarCatatan.map(({ is_okey_new, ...rest }) => rest));
    }
  };

  const CheckBoxItem = ({ itemCatatan } : { itemCatatan: CatatanMap }) => {
      const isOkey: boolean = itemCatatan.user_id === user.id;
      return (
        <Checkbox
          id={itemCatatan.id}
          checked={itemCatatan.is_okey_new === undefined ? itemCatatan.is_okey : itemCatatan.is_okey_new}
          onCheckedChange={isOkey ? (checked) => handleCheckedChange(checked as boolean, itemCatatan.id) : undefined}
          disabled={submitMode === 'edit'}
        />
      )
  };

  const ButtenEditItem = ({ itemCatatan } : { itemCatatan: CatatanMap }) => {
      const isOkey: boolean = itemCatatan.user_id === user.id;
      return (
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 text-muted-foreground"
                        onClick={() => handleEdit(itemCatatan)}
                        disabled={selectedItems.length > 0 || !isOkey}
                    >
                    <Edit2 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
      )
  };

  const ButtenDestroyItem = ({ itemCatatan } : { itemCatatan: CatatanMap }) => {
      const isOkey: boolean = itemCatatan.user_id === user.id;
      return (
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 text-muted-foreground"
                        type="button"
                        onClick={() => handleDestroy(itemCatatan.id)}
                        disabled={onDestroy || submitMode === 'edit' || selectedItems.length > 0 || !isOkey}
                    >
                        <Trash />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Hapus</TooltipContent>
            </Tooltip>
          </TooltipProvider>
      )
  };

  useEffect(() => {
    if (dialogOpen) {
      fetchCatatan();
      setData({...data, berka_id: dataValue.id});
    } else {
      clearErrors();
      handleReset();
      setSubmitMode("create");
    }

    return () => {
        dialogOpen;
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (stateCatatans) {
      switch (stateCatatans.action) {
      case 'addcatatan':
          addNewCatatan(stateCatatans);
          break;
      case 'updatecatatan':
          updateNewCatatan(stateCatatans);
          break;
      case 'destroycatatan':
          destroyCatatan(stateCatatans.id);
          break;
      default:
          return () => { stateCatatans; }
      }
    } else {
        return () => { stateCatatans; }
    }

    return () => { stateCatatans; }

  }, [stateCatatans]);

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
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-8 text-sm text-muted-foreground px-6">
        <div>Kegiatan</div>
        <div className="col-span-7">: {dataValue.kegiatan}</div>
        <div>No. Spm</div>
        <div className="col-span-7">: {dataValue.no_spm}</div>
      </div>
          <div ref={scrollRef} className="xl:max-h-120 max-h-80 overflow-y-auto mx-4 border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-7">
                      {/* <Checkbox id="terms" className="bg-background" /> */}
                  </TableHead>
                  <TableHead>Catatan</TableHead>
                  <TableHead className="w-40">Verifikator</TableHead>
                  <TableHead className="w-28 text-center">{isAdminVerifikator && 'Pilih'}</TableHead>
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
                        <TableCell>
                          <div className={`whitespace-normal ${item.id === data.id && 'font-medium'}`}>
                            {item.catatan}
                          </div>
                          <div className="text-muted-foreground text-xs pt-1.5">{item.created_at}</div>
                        </TableCell>
                        <TableCell>
                          <div key={index} className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9 overflow-hidden rounded-full">
                              {item.foto ?
                              <AvatarImage src={`/storage/${item.foto}`} alt={item.name} />
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
                        <TableCell className="text-center">
                          {isAdminVerifikator && 
                            <div className='flex gap-2.5 justify-center'>
                              <ButtenEditItem itemCatatan={item} />
                              <ButtenDestroyItem itemCatatan={item} />
                            </div>
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  ):(
                    <TableRow>
                      <TableCell colSpan={4}>Tidak catatan.</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
      {isAdminVerifikator ? (
        <form onSubmit={submitForm}>
          <div className="border-t bg-muted dark:bg-background rounded-b-md px-4 py-4">
            <div className="pb-2">
              <InputError
                  message={errors.catatan}
              />
            </div>
            <div className="flex justify-between gap-2 flex-col-reverse sm:flex-row">
              <Button type="button" variant="outline" onClick={handleReset} tabIndex={4}>Reset</Button>
              <Input
                id="catatan"
                name="catatan"
                className="bg-background"
                tabIndex={1}
                value={data.catatan || ''}
                onChange={(e) => setData('catatan', e.target.value)}
                required
                autoFocus
                placeholder="Tulis catatan."
                disabled={selectedItems.length > 0}
              />
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                  <Button 
                    variant={"default"}
                    type="submit" 
                    tabIndex={2}
                    disabled={processing}
                  >
                    {selectedItems.length > 0 || submitMode === 'edit'  ? 'Update' : 'Simpan'}
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" tabIndex={3} disabled={processing}>Tutup</Button>
                  </DialogClose>
              </div>
            </div> 
          </div>
        </form>
      ): (
        <div className="flex border-t bg-muted dark:bg-background rounded-b-md px-4 py-4">
          <div className="ml-auto">
            <DialogClose asChild>
              <Button variant="outline" tabIndex={3} disabled={processing}>Tutup</Button>
            </DialogClose>
          </div>
        </div>
      )}
    </DialogContent>
  );
}

