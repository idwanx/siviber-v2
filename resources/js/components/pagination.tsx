import { Link } from '@inertiajs/react';

// interface LinksType {
//     active: boolean
//     label: string;
//     page: number | null;
//     url: string | null;
// }

// interface LinksTypeProps {
//     from: number;
//     links: LinksType[];
//     to: number;
//     total: number;
// }

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
    page: number;
    url: string;
}

export interface IndexProps {
    links: Links;
    meta: Meta;
}

export default function Pagination({ links, meta }: IndexProps ) {

    return ( 
        <div className="flex items-center gap-x-2">
            {meta?.links.map((link, index) => {
                return link.url === null ? (
                    <span key={index} className="text-sm text-foreground/50 mx-2" 
                    dangerouslySetInnerHTML={{ __html: link.label }} />
                ):(
                    <Link preserveScroll key={index}
                        className={`${link.active ? 'text-foreground font-semibold border-foreground' : 'text-foreground/80 border-foreground/50'} lg:text-sm px-3 py-1 border rounded-lg`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }} 
                        
                    />
                )
            })}
        </div>
    );
}