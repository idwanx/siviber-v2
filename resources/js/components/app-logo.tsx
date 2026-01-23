
export default function AppLogo() {
    return (
        <>
            <div className="flex items-center justify-center">
                {/* <AppLogo /> */}
                <img className="h-8 w-8" src="/apple-touch-icon.png" alt="" />
                <div className="ml-2 overflow-hidden leading-[1]">
                    <p className="text-sm font-extrabold text-foreground tracking-[.24em]">BPKPD</p>
                    <p className="text-sm/4 font-extrabold text-red-500 tracking-[.10em]">BOLSEL</p>
                </div>
            </div>
        </>
    );
}
