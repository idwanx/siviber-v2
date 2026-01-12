import { login } from '@/routes';
import { store } from '@/routes/register';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface RegisterForm {
    instansi: string
    peran: string
    name: string
    email: string
    nip: string
    no_hp: string
    password: string
    password_confirmation: string
}

interface ListInstansi {
    id?: number
    nama_instansi?: string
    slug?: string
}

interface ListPeran {
    id?: number
    nama_role?: string
    slug?: string
}

interface SkpdProps {
    instansis: ListInstansi[]
    perans: ListPeran[]
}

export default function Register({ instansis, perans }: SkpdProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [error, setError] = useState<RegisterForm>({
        instansi: '',
        peran: '',
        name: '',
        nip: '',
        email: '',
        no_hp: '',
        password: '',
        password_confirmation: '',
    });

    const { data, setData, post, processing, errors, clearErrors } = useForm<RegisterForm>({
        instansi: '',
        peran: '',
        name: '',
        nip: '',
        email: '',
        no_hp: '',
        password: '',
        password_confirmation: '',
    });

    const handleError = (error: string, input: string) => {
        setError(prevState => (
            {...prevState, [input]: error}
        ));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let isValid = true;

        if (!data.instansi) {
            handleError('Instansi wajib dipilih', 'instansi');
            isValid = false;
        }

        if (!data.peran) {
            handleError('Peran wajib dipilih', 'peran');
            isValid = false;
        }

        if (!data.name) {
            handleError('Nama wajib diisi', 'name');
            isValid = false;
        } else if (data.name.length > 100) {
            handleError('Maksimal 100 karakter', 'name');
            isValid = false;
        }

        if (!data.nip) {
            handleError('Nip wajib diisi', 'nip');
            isValid = false;
        } else if (!data.no_hp.match(/^[0-9\b]+$/)) {
            handleError('Nip tidak valid', 'nip');
            isValid = false;
        } else if (data.nip.length < 18) {
            handleError('Nip kurang dari 18 angka', 'nip');
            isValid = false;
        } else if (data.nip.length > 18) {
            handleError('Nip lebih dari 18 angka', 'nip');
            isValid = false;
        }

        if (!data.email) {
            handleError('Email wajib diisi', 'email');
            isValid = false;
        } else if (!data.email.match(/\S+@\S+\.\S+/)) {
            handleError('Email tidak valid', 'email');
            isValid = false;
        } else if (data.email.length > 50) {
            handleError('Maksimal 50 karakter', 'email');
            isValid = false;
        }

        if (!data.no_hp) {
            handleError('No. hp wajib diisi', 'no_hp');
            isValid = false;
        } else if (!data.no_hp.match(/^[0-9\b]+$/)) {
            handleError('No. hp tidak valid', 'no_hp');
            isValid = false;
        } else if (data.no_hp.length < 11) {
            handleError('No. hp minimal 11 digit', 'no_hp');
            isValid = false;
        } else if (data.no_hp.length > 12) {
            handleError('No. hp maksimal 12 digit', 'no_hp');
            isValid = false;
        }

        if (!data.password) {
            handleError('Password wajib diisi', 'password');
            isValid = false;
        } else if (data.password.length < 8) {
            handleError('Minimal 8 karakter', 'password');
            isValid = false;
        } else if (data.password.length > 50) {
            handleError('Maksimal 50 karakter', 'password');
            isValid = false;
        } else if (data.password !== data.password_confirmation) {
            handleError('konfirmasi pasword tidak cocok', 'password');
            isValid = false;
        }

        if (isValid) {
            post(store().url, { preserveScroll: true });
        }
    };

    return (
        <AuthLayout
            title="Buat Akun"
            description="Lengkapi form dibawah ini untuk membuat akun."
        >
            <Head title="Buat Akun" />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="instansi">
                                    Instansi
                                <span className="text-red-500">*</span>
                                </Label>
                                <Select 
                                    name="instansi"
                                    value={data.instansi} 
                                    onValueChange={(e) => setData('instansi', e)}
                                    required
                                    autoComplete='instansi'
                                >
                                    <SelectTrigger id="instansi" className="w-full" tabIndex={1} autoFocus>
                                        <SelectValue placeholder="Pilih Instansi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Daftar Instansi</SelectLabel>
                                        {instansis.map((instansi, index) => (
                                            <SelectItem key={index} value={`${instansi.id}`}>{instansi.nama_instansi}</SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={error.instansi} />
                                <InputError message={errors.instansi} />
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="peran">
                                    Peran
                                <span className="text-red-500">*</span>
                                </Label>
                                <Select 
                                    name="peran"
                                    value={data.peran} 
                                    autoComplete='peran'
                                    onValueChange={(e) => setData('peran', e)}
                                    required
                                >
                                    <SelectTrigger id="peran" className="w-full" tabIndex={2}>
                                        <SelectValue placeholder="Pilih Peran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Daftar Peran</SelectLabel>
                                        {perans.map((peran, index) => (
                                            <SelectItem key={index} value={`${peran.id}`}>{peran.nama_role}</SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={error.peran} />
                                <InputError message={errors.peran} />
                            </div>
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Nama Lengkap
                                <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="Nama lengkap"
                                    tabIndex={3}
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                />
                                <InputError message={error.name} />
                                <InputError message={errors.name} />
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="nip">
                                    Nip
                                <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="nip"
                                    name="nip"
                                    autoComplete="nip"
                                    placeholder="Nip"
                                    tabIndex={4}
                                    value={data.nip}
                                    onChange={handleChange}
                                    required
                                />
                                <InputError message={error.nip} />
                                <InputError message={errors.nip} />
                            </div>
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    Email
                                <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={5}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                <InputError message={error.email} />
                                <InputError message={errors.email} />
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="no_hp">
                                    No. Hp
                                <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="no_hp"
                                    name="no_hp"
                                    autoComplete="no_hp"
                                    placeholder="No. hp"
                                    tabIndex={6}
                                    value={data.no_hp}
                                    onChange={handleChange}
                                    required
                                />
                                <InputError message={error.no_hp} />
                                <InputError message={errors.no_hp} />
                            </div>
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Password
                                <span className="text-red-500">*</span>
                                </Label>
                                <InputGroup>
                                    <InputGroupInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={7}
                                        autoComplete="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            onClick={togglePasswordVisibility}
                                            aria-label="show password"
                                            tabIndex={8}
                                        >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>

                                <InputError message={error.password} />
                                <InputError message={errors.password} />
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password
                                <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={9}
                                    autoComplete="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi Password"
                                    onChange={handleChange}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center pt-6">
                        <Button
                            type="submit"
                            className="mt-2 whitespace-nowrap"
                            tabIndex={10}
                            data-test="register-user-button"
                        >
                            {processing && <Spinner />}
                            Buat Akun
                        </Button>
                    </div>
                    <div className="relative my-4 flex items-center justify-center overflow-hidden">
                        <Separator />
                        <div className="px-2 text-center text-foreground text-sm">atau</div>
                        <Separator />
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Sudah punya akun?{' '}
                        <TextLink href={login()} tabIndex={11}>
                            Log in
                        </TextLink>
                    </div>
                </form>
        </AuthLayout>
    );
}
