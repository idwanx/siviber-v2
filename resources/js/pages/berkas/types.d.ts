export type ModeSubmit = "create" | "edit";
export type StatusType = 1 | 2 | 3 | 4;

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

export interface CekVerifikatorKonfirmasi {
    id: number;
    name: string
    jumlah_riwayat: number
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

export interface MetaLinks {
    active: boolean;
    label: string;
    page: number;
    url: string;
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

export interface DataBerkas {
    data: FieldDataBerkas[];
    meta: Meta;
    links: Links;
    tahun: number;
    menuOption: string;
}

export interface IndexBerkasProps extends Record<string, any> {
    daftarberkas: DataBerkas;
    tahun: number;
    menuOption: string;
}

export interface FlashUpdateStatusProps extends Record<string, any> {
    flash?: {
        type?: string; 
        message?: string;
    }
}

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