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
