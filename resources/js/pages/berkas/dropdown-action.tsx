import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Printer, Trash2 } from "lucide-react";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from './Print.module.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ModeType = "create" | "update";

interface SelectProps {
  openModalCrud: (mode: ModeType, item: number) => void;
  openDialogDestroy: (item: number) => void;
  openDialogDetail: (item: number) => void;
  dataValue: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  sender: string;
  client: string;
  items: InvoiceItem[];
  total: number;
}

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};

export default function DropDownPilihan({ openModalCrud, openDialogDestroy, openDialogDetail, dataValue }: SelectProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  
      const handlePrint = useReactToPrint({
          contentRef: componentRef,
          documentTitle: 'Lembar Pengesahan',
        });
      
        // Dummy Data
        const invoiceData: InvoiceData = {
          invoiceNumber: "INV-001",
          date: "2023-10-25",
          sender: "Your Company",
          client: "Client Name",
          items: [
            { id: 1, description: "Consulting", quantity: 10, price: 50 },
            { id: 2, description: "Development", quantity: 20, price: 100 },
          ],
          total: 2500,
        };

  return (
    <>
      {/* <div style={{ display: "none" }}> */}
        <PrintComponent ref={componentRef} data={invoiceData} />
      {/* </div> */}

      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openDialogDetail(dataValue)}>
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => openModalCrud("update", dataValue)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => openDialogDestroy(dataValue)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

const PrintComponent = forwardRef<HTMLDivElement, { data: InvoiceData }>((props, ref) => {
  const { data } = props;

  const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
  
  return (
    // 2. A4 Page Constraint
    <div ref={ref} className={styles.print}>
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">LEMBAR KOORDINASI</h1>
        </div>
      </div>

      {/* Client & Date */}
       <div className="py-4">
        <div className="sm:grid sm:grid-cols-5">
          <div>Instansi</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Nomor SPM</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Tanggal SPM</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Jenis SPM</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Nilai SPM</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Bendahara/Pihak Ketiga</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>No. Rekening</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>NPWP</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Tanggal Registrasi</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Kegiatan</div>
          <div className="sm:col-span-4">: Dinas Pendidikan dan Kebudayaan</div>
        </div>
       </div>

       <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3"><div className="flex justify-center">PARAF KOORDINASI</div></div>
       </div>

      <div className="flex">
        
        <div className="w-1/3">PENELITIAN KELENGKAPAN DOKUMEN</div>
        <div className="w-2/3">
            
            <table>
            <thead>
              <tr>
                <th className="p-1 text-center">Koordinasi</th>
                <th className="p-1 text-center">Tanggal</th>
                <th className="p-1 text-center">Paraf</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});