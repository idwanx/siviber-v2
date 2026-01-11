
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useForm } from "@inertiajs/react";
import { datapendukungregis } from "@/routes/fetch";
import berkas from "@/routes/berkas";
import { toast } from "sonner";
import { FieldDataBerkas } from "./types";

interface DataJenisBerkas {
    id: string;
    nama_jenis_berkas: string;
}

interface DataPenerima {
    id: number;
    nama_penerima: string;
    norek: string;
    npwp: string;
}

interface DataSumberDana {
    id: string
    nama_sumber_dana: string
}

interface PropsDataPendukung {
    jenisberkas: DataJenisBerkas[];
    penerimas: DataPenerima[];
    sumberdanas: DataSumberDana[];
}

interface FlashProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string
    }
}

type ModeType = "create" | "update";

interface BerkasProps {
    modalCrud: boolean;
    addNew: (data: any) => void;
    dataState?: number;
    modeType: ModeType;
    closeModal: (open: boolean) => void;
    updateBerkas: (data: any) => void;
}

export default function FormRegistrasiBerkas({ modalCrud, addNew, dataState, modeType, closeModal, updateBerkas } : BerkasProps) {
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [jenisBerkas, setJenisBerkas] = useState<DataJenisBerkas[]>([]);
  const [penerimas, setPenerimas] = useState<DataPenerima[]>([]);
  const [sumberDana, setSumberDana] = useState<DataSumberDana[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { data, setData, post, put, processing, errors, clearErrors, reset } = useForm({
      no_spm: '',
      tgl_spm: '',
      jenis_berka_id: '',
      nilai_spm: '',
      sumber_dana_id: '',
      penerima_id: '',
      kegiatan: '',
      norek: '',
      npwp: '',
      jenis_spm_text: '',
      sumber_dana_text: '',
  });

  const [error, setError] = useState({
      no_spm: '',
      tgl_spm: '',
      jenis_berka_id: '',
      nilai_spm: '',
      sumber_dana_id: '',
      penerima_id: '',
      kegiatan: '',
      norek: '',
      npwp: ''
  });

  const getDataPendukungRegis = async () => {
    setIsLoading(true);
      try {
          const response = await fetch(datapendukungregis().url);
          const result: PropsDataPendukung = await response.json();
          setJenisBerkas(result.jenisberkas);
          setPenerimas(result.penerimas);
          setSumberDana(result.sumberdanas);
          setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          throw error;
      }
  };

  const getDataBerkasToUpdate = useCallback(async (id: number): Promise<void> => {
    setIsLoadingUpdate(true);
      try {
          const response = await fetch(berkas.edit(id).url);
          const result: any = await response.json();
          setData({
            no_spm: result.no_spm,
            tgl_spm: result.tgl_spm,
            jenis_berka_id: result.jenis_berka_id,
            nilai_spm: `${result.nilai_spm}`,
            sumber_dana_id: result.sumber_dana_id,
            penerima_id: `${result.penerima_id}`,
            kegiatan: result.kegiatan,
            norek: result.norek,
            npwp: result.npwp,
            jenis_spm_text: `${result.jenis_berka_id}-${result.nama_jenis_berkas}`,
            sumber_dana_text: `${result.sumber_dana_id}-${result.nama_sumber_dana}`,
          });
          setDate(new Date(result.tgl_spm));
          setIsLoadingUpdate(false);
      } catch (error) {
          setIsLoadingUpdate(false);
          throw error;
      }
  }, []);

  useEffect(() => {
    if (modalCrud) {
      getDataPendukungRegis();
      if (modeType === "create") {
        handleReset();
      } else {
        getDataBerkasToUpdate(dataState!);
      }
    }

    return () => {
        modalCrud;
    }
  }, [modalCrud, modeType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

// Clear error
  const handleError = (error: string, input: string) => {
      setError(prevState => (
          {...prevState, [input]: error}
      ));
  };

// Validasi inputan form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      let isValid = true;

      if (!data.no_spm) {
          handleError('No. spm wajib di isi', 'no_spm');
          isValid = false;
      } else if (data.kegiatan.length > 250) {
          handleError('No spm maksimal 250 karakter', 'no_spm');
          isValid = false;
      }

      if (!data.tgl_spm) {
          handleError('Tanggal wajib di pilih', 'tgl_spm');
          isValid = false;
      }

      if (!data.jenis_berka_id) {
          handleError('Jenis spm wajib di pilih', 'jenis_berka_id');
          isValid = false;
      }

      if (!data.nilai_spm) {
          handleError('Nilai spm wajib di isi', 'nilai_spm');
          isValid = false;
      } else if (!data.nilai_spm.match(/^[0-9\b]+$/)) {
          handleError('Nilai spm harus di isi angka', 'nilai_spm');
          isValid = false;
      } else if (data.nilai_spm.length < 0) {
          handleError('Nilai minimal di isi 0 (nol)', 'nilai_spm');
          isValid = false;
      } else if (data.nilai_spm.length > 14) {
          handleError('Nilai spm maksimal 14 digit', 'nilai_spm');
          isValid = false;
      }

      if (!data.sumber_dana_id) {
          handleError('Sumber dana wajib di pilih', 'sumber_dana_id');
          isValid = false;
      }

      if (!data.penerima_id) {
          handleError('Penerima wajib di pilih', 'penerima_id');
          isValid = false;
      }

      if (!data.kegiatan) {
          handleError('Kegiatan wajib di isi', 'kegiatan');
          isValid = false;
      } else if (data.kegiatan.length > 250) {
          handleError('Kegiatan maksimal 250 karakter', 'kegiatan');
          isValid = false;
      }
      
      if (isValid) {
        e.preventDefault();

        switch (modeType) {
        case 'update':
            put(berkas.update(dataState!).url, {
              preserveScroll: true,
              onSuccess: (response: { props: FlashProps }) => {
                const dataUpdate: FieldDataBerkas = response.props.newdata?.datas;
                updateBerkas(dataUpdate);
                clearErrors();
                closeModal(false);
                reset();
                if (response.props.flash?.type === 'success') {
                    toast.success(response.props.flash?.message);
                } else if (response.props.flash?.type === 'error') {
                    toast.error(response.props.flash?.message);
                } else {
                    toast.info(response.props.flash?.message);
                }
              },
            });

            break;
        default:
            post(berkas.store().url, {
              preserveScroll: true,
              onSuccess: (response: { props: FlashProps }) => {
                  const berkasBaru: any = response.props.newdata?.datas;
                  addNew(berkasBaru.data);
                  reset('no_spm', 'kegiatan');
                  clearErrors();
                  if (response.props.flash?.type === 'success') {
                      toast.success(response.props.flash?.message);
                  } else if (response.props.flash?.type === 'error') {
                      toast.error(response.props.flash?.message);
                  } else {
                      toast.info(response.props.flash?.message);
                  }
              },
            });

            break;
        }
      }
  };

  function handleReset() {
    reset();
    clearErrors();
    setError({
      no_spm: '',
      tgl_spm: '',
      jenis_berka_id: '',
      nilai_spm: '',
      sumber_dana_id: '',
      penerima_id: '',
      kegiatan: '',
      norek: '',
      npwp: ''
    });
    setIsLoading(false);
    setIsLoadingUpdate(false);
  };

  const handleSelectJenisSpm = (value: string) => {
    const parts = value.split('-');
    setData({ ...data, 
      jenis_berka_id: parts[0], 
      jenis_spm_text: value
    });
  };

  const handleSelectSumberDana = (value: string) => {
    const parts = value.split('-');
    setData({ ...data, 
      sumber_dana_id: parts[0],
      sumber_dana_text: value
    });
  };

  return (
    <>
      <DialogContent
        onInteractOutside={(e) => {
            e.preventDefault();
        }}
        className="p-0 max-h-[95vh] sm:max-w-3xl gap-0 overflow-y-auto"
      >
        <DialogHeader className="border-b px-6 py-4 pt-5">
          <DialogTitle>Registrasi Berkas</DialogTitle>
          <DialogDescription>
            Silahkan lengkapi form dibawah ini untuk registrasi berkas.
           </DialogDescription>
        </DialogHeader>
        {isLoadingUpdate ? (
          <div className="flex items-center text-sm text-foreground gap-1 p-6"><Spinner /> Loading...</div>
        ):(
          <form onSubmit={handleSubmit} className="mt-4" noValidate>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 p-6">
              <div className="col-span-full sm:col-span-3">
                <div className="grid gap-2">
                    <Label htmlFor="no_spm">
                        No. Spm
                    <span className="text-red-500">{' '}*</span>
                    </Label>
                    <Input
                        type="text"
                        id="no_spm"
                        name="no_spm"
                        onFocus={() => handleError('', 'no_spm')}
                        autoComplete="no_spm"
                        placeholder="No. Spm"
                        tabIndex={1}
                        value={data.no_spm || ''}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                    <InputError message={error.no_spm} />
                    <InputError message={errors.no_spm} />
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="grid gap-2">
                  <Label htmlFor="tgl_spm" className="px-1">
                    Tanggal Spm
                    <span className="text-red-500">{' '}*</span>
                  </Label>
                  <div className="w-full space-y-2">
                  <Popover open={openDate} onOpenChange={setOpenDate}>
                    <PopoverTrigger asChild tabIndex={2} onFocus={() => handleError('', 'tgl_spm')}>
                      <Button
                        variant="outline"
                        id="tgl_spm"
                        className="w-full justify-between font-normal"
                      >
                        {date ? format(date, "dd-MM-yyyy") : "Pilih tanggal"}
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date)
                          setData('tgl_spm', format(date ? date : new Date, 'yyyy-MM-dd')),
                          setOpenDate(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <InputError message={error.tgl_spm} />
                  <InputError message={errors.tgl_spm} />
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                  <div className="grid gap-2">
                    <Label htmlFor="jenis_spm">
                        Jenis Spm
                    <span className="text-red-500">{' '}*</span>
                    </Label>
                    <Select 
                        name="jenis_berka_id"
                        value={data.jenis_spm_text || ''} 
                        onValueChange={handleSelectJenisSpm}
                        required
                        autoComplete='jenis_berka_id'
                    >
                        <SelectTrigger id="jenis_berka_id" className="w-full" tabIndex={3} onFocus={() => handleError('', 'jenis_berka_id')}>
                            {isLoading ? (<div className="flex items-center gap-1"><Spinner /> Loading...</div>) : <SelectValue placeholder="Pilih Jenis Spm" />}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Jenis Spm</SelectLabel>
                              {jenisBerkas?.map((item, index) => (
                                  <SelectItem key={index} value={`${item.id}-${item.nama_jenis_berkas}`}>{item.nama_jenis_berkas}</SelectItem>
                              ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={error.jenis_berka_id} />
                    <InputError message={errors.jenis_berka_id} />
                  </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="grid gap-2">
                  <Label htmlFor="nilai_spm">
                      Nilai Spm
                  <span className="text-red-500">{' '}*</span>
                  </Label>
                  <Input
                      type="number"
                      id="nilai_spm"
                      name="nilai_spm"
                      autoComplete="nilai_spm"
                      placeholder="Nilai spm"
                      tabIndex={4}
                      value={data.nilai_spm || ''}
                      onChange={handleChange}
                      onFocus={() => handleError('', 'nilai_spm')}
                      required
                  />
                  <InputError message={error.nilai_spm} />
                  <InputError message={errors.nilai_spm} />
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                  <div className="grid gap-2">
                    <Label htmlFor="sumber_dana_id">
                        Sumber Dana
                    <span className="text-red-500">{' '}*</span>
                    </Label>
                    <Select 
                        name="sumber_dana_id"
                        value={data.sumber_dana_text || ''} 
                        onValueChange={handleSelectSumberDana}
                        required
                        autoComplete='sumber_dana_id'
                    >
                        <SelectTrigger id="sumber_dana_id" className="w-full" tabIndex={5} onFocus={() => handleError('', 'sumber_dana_id')}>
                            {isLoading ? (<div className="flex items-center gap-1"><Spinner /> Loading...</div>) : <SelectValue placeholder="Pilih Sumber Dana" />}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Sumber Dana</SelectLabel>
                            {sumberDana.map((item, index) => (
                                <SelectItem key={index} value={`${item.id}-${item.nama_sumber_dana}`}>{item.nama_sumber_dana}</SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={error.sumber_dana_id} />
                    <InputError message={errors.sumber_dana_id} />
                  </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="grid gap-2">
                  <Label htmlFor="penerima_id">
                      Penerima
                  <span className="text-red-500">{' '}*</span>
                  </Label>

                  <Popover open={open} onOpenChange={setOpen} modal>
                    <PopoverTrigger asChild className="text-muted-foreground font-normal" tabIndex={6} onFocus={() => handleError('', 'penerima_id')}>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='w-full justify-between'
                        aria-label='Combo penerima'
                      >
                        {data.penerima_id ? penerimas.find((item) => `${item.id}` === data.penerima_id)?.nama_penerima : isLoading ? (<div className="flex items-center gap-1"><Spinner /> Loading...</div>) : 'Pilih penerima...'}
                        <ChevronsUpDownIcon className='opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0' align='start'>
                      <Command>
                        <CommandInput placeholder='Cari penerima...' className='h-9' />
                        <CommandList>
                          <CommandEmpty>Cari penerima.</CommandEmpty>
                          <CommandGroup>
                            {penerimas.map(item => (
                              <CommandItem
                                key={`${item.id}`}
                                id="penerima"
                                value={item.nama_penerima}
                                onSelect={(currentValue) => {
                                  setData("penerima_id", currentValue === data.penerima_id ? '' : `${item.id}`),
                                  setData("norek", item.norek),
                                  setData("npwp", item.npwp),
                                  setOpen(false);
                                }}
                              >
                                {item.nama_penerima}
                                <CheckIcon className={cn('ml-auto', data.penerima_id === `${item.id}` ? 'opacity-100' : 'opacity-0')} />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <InputError message={error.penerima_id} />
                  <InputError message={errors.penerima_id} />
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                  <div className="grid gap-2">
                    <Label htmlFor="norek">
                        No. Rekening
                    <span className="text-muted-foreground text-xs">{' '}otomatis</span>
                    </Label>
                    <Input
                        type="text"
                        id="norek"
                        name="norek"
                        autoComplete="norek"
                        placeholder="No. rekening"
                        value={data.norek || ''}
                        disabled={true}
                    />
                  </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="grid gap-2">
                  <Label htmlFor="npwp">
                        Npwp
                    <span className="text-muted-foreground text-xs">{' '}otomatis</span>
                    </Label>
                    <Input
                        type="text"
                        id="npwp"
                        name="npwp"
                        autoComplete="npwp"
                        placeholder="Npwp"
                        value={data.npwp || ''}
                        disabled={true}
                    />
                </div>
              </div>
              <div className="col-span-full">
                <div className="grid gap-2">
                  <Label htmlFor="npwp">
                      Kegiatan
                  <span className="text-red-500">{' '}*</span>
                  </Label>
                  <Textarea
                    id="kegiatan"
                    name="kegiatan"
                    value={data.kegiatan || ''}
                    placeholder="Kegiatan"
                    onChange={handleChange}
                    onFocus={() => handleError('', 'kegiatan')}
                    rows={3}
                    tabIndex={7}
                  />
                  <InputError message={error.kegiatan} />
                  <InputError message={errors.kegiatan} />
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between space-x-4 p-6 flex-col-reverse sm:flex-row">
              <Button type="button" variant="outline" onClick={handleReset} tabIndex={8}>Reset</Button>
              <div className="flex flex-col-reverse items-center gap-2 sm:flex-row">
                {processing ? (
                      <>
                      <Spinner />
                      <i className="text-sm text-muted-foreground">menyimpan...</i>
                      </>
                      ) : null
                  }
                  <Button 
                    variant={"default"}
                    type="submit" 
                    tabIndex={9}
                    disabled={processing}
                  >
                    Simpan
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" tabIndex={10}>Tutup</Button>
                  </DialogClose>
              </div>
            </div> 
          </form>
        )}
      </DialogContent>
    </>
  );
}