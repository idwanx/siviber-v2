import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import LayoutSettings from './layout-settings';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import profile from '@/routes/profile';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Pengaturan', href: "#"},
    {title: 'Profil', href: "#"}
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, recentlySuccessful, processing, progress, errors } = useForm({
        name: auth.user.name || '',
        nip: auth.user.nip || '',
        no_hp: auth.user.no_hp || '',
        email: auth.user.email || '',
        foto: null as File | null
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
    
        patch(profile.update().url, {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files && e.target.files.length > 0) {
        //     setData('foto', e.target.files[0]);
        // }
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('foto', file);
            // Create a URL for the image preview
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setData('foto', null);
            setImagePreviewUrl(null);
        }
    };

    return (
        <>
        <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
            <div className="flex-1 w-full overflow-hidden">
                <div className="bg-background shadow-sm rounded-xl p-4 border border-sidebar-border/70 sm:max-w-lg dark:border-sidebar-border">
                        <div className="flex flex-1">
                            <Heading
                                title="Profil"
                            />
                        </div>
                        <Separator className="mb-6" />
                        <form onSubmit={submitForm} className="space-y-6"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={data.name}
                                    name="name"
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    placeholder="Nama"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nip">Nip</Label>

                                <Input
                                    id="nip"
                                    className="mt-1 block w-full"
                                    defaultValue={data.nip}
                                    name="nip"
                                    onChange={handleChange}
                                    required
                                    autoComplete="nip"
                                    placeholder="Nip"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.nip}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="no_hp">No. Hp</Label>

                                <Input
                                    id="no_hp"
                                    className="mt-1 block w-full"
                                    defaultValue={data.no_hp}
                                    name="no_hp"
                                    onChange={handleChange}
                                    required
                                    autoComplete="no_hp"
                                    placeholder="No. Hp"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.no_hp}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={data.email}
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    autoComplete="username"
                                    placeholder="Email"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="foto">Foto</Label>

                                <Input
                                    id="foto"
                                    type="file"
                                    className="mt-1 block w-full"
                                    accept="image/*"
                                    // defaultValue={data.foto}
                                    name="foto"
                                    onChange={handleFileFoto}
                                />
                                <span className='text-xs text-muted-foreground'>Maksimal ukuran foto 5 mb</span>

                                <InputError
                                    className="mt-2"
                                    message={errors.foto}
                                />
                            </div>

                            {imagePreviewUrl && (
                                <div className="grid gap-2">
                                    <Label htmlFor="foto">Preview Foto</Label>
                                    <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '300px' }} />
                                </div>
                            )}

                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Email anda belum diverifikasi.{' '}
                                        <Link
                                            href={send()}
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Klik di sini untuk mengirim ulang email verifikasi.
                                        </Link>
                                    </p>

                                    {status ===
                                        'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            Tautan verifikasi yang baru telah
                                            dikirim ke email Anda.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    Simpan
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-foreground">
                                        Tersimpan
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    {/* <DeleteUser /> */}
                </div>
            </div>
        </>
    );
}

Profile.layout = (page: React.ReactNode) => (
    <AppLayout>
        <LayoutSettings children={page} />
    </AppLayout>
)