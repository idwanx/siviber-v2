import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Link, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import LayoutSettings from './layout-settings';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

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

                        <Form
                            {...ProfileController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            className="space-y-6"
                        >
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>

                                        <Input
                                            id="name"
                                            className="mt-1 block w-full"
                                            defaultValue={auth.user.name}
                                            name="name"
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
                                            defaultValue={auth.user.nip}
                                            name="nip"
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
                                            defaultValue={auth.user.no_hp}
                                            name="no_hp"
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
                                            defaultValue={auth.user.email}
                                            name="email"
                                            required
                                            autoComplete="username"
                                            placeholder="Email"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>

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
                                                        Tautan verifikasi baru telah
                                                        dikirim ke alamat email Anda.
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    <div className="flex items-center gap-4">
                                        <Button
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
                                            <p className="text-sm text-neutral-600">
                                                Tersimpan
                                            </p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
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