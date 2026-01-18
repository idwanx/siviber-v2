import { forwardRef } from "react";
import styles from './Print.module.css';
import { Square } from "lucide-react";

const LembarVerifikasi = forwardRef<HTMLDivElement, { data: any }>((props, ref) => {
  const { data } = props;

  return (
    // 2. A4 Page Constraint
    <div ref={ref} className={styles.print}>
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">LEMBAR VERIFIKASI</h1>
        </div>
      </div>

      {/* Client & Date */}
       <div className="py-4">
        {/* <div className="sm:grid sm:grid-cols-5">
          <div>No. Registrasi</div>
          <div className="sm:col-span-4">: <span className="font-mono">{data?.kode}</span></div>
        </div> */}
        <div className="sm:grid sm:grid-cols-5">
          <div>Instansi</div>
          <div className="sm:col-span-4">:{' '}{data?.nama_instansi}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Nomor SPM</div>
          <div className="sm:col-span-4">:{' '}{data?.no_spm}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Tanggal SPM</div>
          <div className="sm:col-span-4">:{' '}{data?.tgl_spm}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Jenis SPM</div>
          <div className="sm:col-span-4">:{' '}{data?.nama_jenis_berkas}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Sumber Dana</div>
          <div className="sm:col-span-4">:{' '}{data?.nama_sumber_dana}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Nilai SPM</div>
          <div className="sm:col-span-4">:{' '}<span className="font-mono">Rp. {Number(data?.nilai_spm).toLocaleString("id-ID")}</span></div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Bendahara/Pihak Ketiga</div>
          <div className="sm:col-span-4">:{' '}{data?.nama_penerima}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>No. Rekening</div>
          <div className="sm:col-span-4">:{' '}<span className="font-mono">{data?.norek}</span></div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>NPWP</div>
          <div className="sm:col-span-4">:{' '}<span className="font-mono">{data?.npwp}</span></div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Tanggal Registrasi</div>
          <div className="sm:col-span-4">:{' '}{data?.created_at}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Kegiatan</div>
          <div className="sm:col-span-4">:{' '}{data?.kegiatan}</div>
        </div>
       </div>

       <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3"><div className="flex justify-center font-medium">PARAF KOORDINASI</div></div>
       </div>

      <div className="flex gap-4">
        <div className="w-1/3 space-y-0.5">
          <p className="font-medium">PENELITIAN KELENGKAPAN DOKUMEN</p>
          <div className="flex items-center gap-0.5"><div className="w-3">1.</div><Square strokeWidth={1} />Cek list</div>
          <div className="flex items-center gap-0.5"><div className="w-3">2.</div><Square strokeWidth={1} />Surat Pengantar SPP-UP</div>
          <div className="flex items-center gap-0.5"><div className="w-3">3.</div><Square strokeWidth={1} />Ringkasan SPP-UP</div>
          <div className="flex items-center gap-0.5"><div className="w-3">4.</div><Square strokeWidth={1} />Rincian SPP-UP</div>
          <div className="flex items-center gap-0.5"><div className="w-3">5.</div><Square strokeWidth={1} />SPM-UP</div>
          <div className="flex items-center gap-0.5"><div className="w-3">6.</div><Square strokeWidth={1} />Salinan SPD</div>
          Surat pengantar yang ditandatangani PA/KPA yang menyatakan bahwa uang yang diminta tidak dipergunakan untuk keperluan 
          selain uang persediaan saat pengajuan SP2D kepada kuasa BUD.
        </div>
        <div className="w-2/3">
            <table className="w-full table-fixed">
            <thead>
              <tr>
                <th style={{width: '170px'}} className="p-1 text-center">Koordinasi</th>
                <th className="p-1 text-center">Tanggal</th>
                <th className="p-1 text-center">Paraf</th>
              </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                  <td className="p-3">SUBDID PERBEND I</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">SUBDID PERBEND II</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">SUBDID ADM. BUD</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">BIDANG ASET</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">KABID PERBENDAHARAAN</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">BIDANG AKUNTANSI</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">BIDANG DANA TRANSFER</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export { LembarVerifikasi };