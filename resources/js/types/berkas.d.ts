export type ModeType = "create" | "edit";
export type StatusType = 1 | 2 | 3 | 4;

interface FlashProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string
    }
}

// Berkas
export interface BerkasProps {
    daftarberkas: DaftarBerkas;
    tahun: number;
    menuOption: string;
    filtered: FilteredValues;
    instansi: InstansiProps[];
    jenisberkas: JenisBerkasProps[];
    sumberdana: SumberDanaProps[];
}

interface FilteredValues {
    cari: string;
    load: string;
    instansi: string,
    jenisspm: string,
    sumberdana: string,
}

interface InstansiProps {
    slug: string;
    nama_instansi: string;
}

interface JenisBerkasProps {
    slug: string;
    nama_jenis_berkas: string,
}

interface SumberDanaProps {
    slug: string;
    nama_sumber_dana: string;
}

export interface DaftarBerkas {
    data: FieldDataBerkas[];
    links: Links;
    meta: Meta;
}

export interface FieldDataBerkas {
    id: number;
    hari: string;
    hari_ke: number;
    jam: string;
    jumlah_catatan: number;
    kegiatan: string;
    kode: string;
    nama_instansi: string;
    nama_jenis_berkas: string;
    nama_sumber_dana: string;
    no_spm: string;
    status_berka_id: StatusType;
    tgl_spm: string;
    tgl_registrasi: string;
    riwayats: Riwayats[];
}

export interface Riwayats {
    berka_id: number;
    created_at?: string;
    id: number;
    status_berka_id: StatusType;
    user_id: number;
    jam?: string;
    name?: string;
    foto?: string | null;
    status_berkas?: string;
}

export interface Links {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLinks[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface MetaLinks {
    active: boolean;
    label: string;
    page: number | null;
    url: string | null;
}

export interface UpdateJumlahCatatan {
    berka_id: number;
    jumlah_catatan: number;
}

// Form
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

// Catatan
export interface CatatanMap {
    berka_id: number;
    catatan: string;
    created_at: string;
    foto?: string;
    id: string;
    is_okey: boolean;
    is_okey_new?: boolean;
    jumlah_catatan?: number;
    name: string;
    user_id: number;
}

export interface FormFieldCatatan {
    id: string;
    berka_id: number;
    catatan: string;
}

interface ChekedProps {
    id: string;
    is_okey: boolean;
}

export interface FlashCatatanProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string,
        data?: any;
    }
    newdata?: {
        datas?: any;
    }
}