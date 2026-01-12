import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import AppLayout from '@/layouts/app-layout';
import { disable, enable, show } from '@/routes/two-factor';
import { type BreadcrumbItem } from '@/types';
import { Form } from '@inertiajs/react';
import { ShieldBan, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import LayoutSettings from './layout-settings';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/heading';

interface TwoFactorProps {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Pengaturan', href: "#"},
    {title: 'Autentikasi Dua Faktor', href: "#"}
];

export default function TwoFactor({
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: TwoFactorProps) {
    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);

    return (
        <>
        <AppSidebarHeader breadcrumbs={breadcrumbs} trigger={true} />
        <div className="flex-1 w-full overflow-hidden">
            <div className="bg-background shadow-sm rounded-xl p-4 border border-sidebar-border/70 sm:max-w-lg dark:border-sidebar-border">
                <div className="flex flex-1">
                    <Heading
                        title="Autentikasi Dua Faktor"
                    />
                </div>
                <Separator className="mb-6" />
                {twoFactorEnabled ? (
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <Badge variant="default">Aktifkan</Badge>
                        <p className="text-muted-foreground">
                            Dengan otentikasi dua faktor diaktifkan, Anda akan 
                            diminta memasukkan PIN acak yang aman selama 
                            proses masuk, yang dapat Anda peroleh dari 
                            aplikasi yang mendukung TOTP di ponsel Anda.
                        </p>

                        <TwoFactorRecoveryCodes
                            recoveryCodesList={recoveryCodesList}
                            fetchRecoveryCodes={fetchRecoveryCodes}
                            errors={errors}
                        />

                        <div className="relative inline">
                            <Form {...disable.form()}>
                                {({ processing }) => (
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        <ShieldBan /> Non aktifkan 2FA
                                    </Button>
                                )}
                            </Form>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <Badge variant="destructive">Non aktif</Badge>
                        <p className="text-muted-foreground">
                            Saat Anda mengaktifkan otentikasi dua faktor, Anda akan diminta memasukkan PIN aman saat masuk. 
                            PIN ini dapat diperoleh dari aplikasi yang mendukung TOTP di ponsel Anda.
                        </p>

                        <div>
                            {hasSetupData ? (
                                <Button
                                    onClick={() => setShowSetupModal(true)}
                                >
                                    <ShieldCheck />
                                    Lanjutkan pengaturan
                                </Button>
                            ) : (
                                <Form
                                    {...enable.form()}
                                    onSuccess={() =>
                                        setShowSetupModal(true)
                                    }
                                >
                                    {({ processing }) => (
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            <ShieldCheck />
                                            Aktifkan 2FA
                                        </Button>
                                    )}
                                </Form>
                            )}
                        </div>
                    </div>
                )}

                <TwoFactorSetupModal
                    isOpen={showSetupModal}
                    onClose={() => setShowSetupModal(false)}
                    requiresConfirmation={requiresConfirmation}
                    twoFactorEnabled={twoFactorEnabled}
                    qrCodeSvg={qrCodeSvg}
                    manualSetupKey={manualSetupKey}
                    clearSetupData={clearSetupData}
                    fetchSetupData={fetchSetupData}
                    errors={errors}
                />
            </div>
        </div>
        </>
    );
}
TwoFactor.layout = (page: React.ReactNode) => (
    <AppLayout>
        <LayoutSettings children={page} />
    </AppLayout>
)