import { Check, CircleCheckBig, CircleSlash2, FileInput } from "lucide-react";

type StatusType = 1 | 2 | 3 | 4;

function LabelIconStatus({ status }: { status: StatusType }) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center justify-center space-x-2 font-medium tracking-wide text-blue-500 dark:text-blue-400">
          <FileInput className="size-4" />
          <span>Registrasi</span>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center justify-center space-x-2 font-medium tracking-wide text-amber-500 dark:text-amber-400">
          <Check className="size-4" />
          <span>Verifikasi</span>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center justify-center font-medium space-x-2 tracking-wide text-red-500">
          <CircleSlash2 className="size-4 text-red-500" />
          <span>Penolakan</span>
        </div>
      );
    case 4:
      return (
        <div className="flex items-center justify-center space-x-2 font-medium tracking-wide text-green-600 dark:text-green-400">
          <CircleCheckBig className="size-4" />
          <span>Sp2d</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center space-x-2 tracking-wide text-blue-500">
          <FileInput className="size-4" />
          <span>Registrasi</span>
        </div>
      );
  }
}

export { LabelIconStatus }