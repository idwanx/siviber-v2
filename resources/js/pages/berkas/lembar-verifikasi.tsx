import { forwardRef, useCallback, useEffect, useState } from "react";
import styles from './Print.module.css';
import berkas from "@/routes/berkas";


const LembarVerifikasi = forwardRef<HTMLDivElement, { data: number }>((props, ref) => {
  const { data } = props;

  const [dataBerkas, setDataBerkas] = useState<any>();

  // const getDetailBerkas = useCallback(async (idBerkas: number): Promise<void> => {

  //     try {
  //         const response = await fetch(berkas.detail(idBerkas).url);
  //         const result: any = await response.json();
  //         setDataBerkas(result);

  //     } catch (error) {
  //         throw error;
  //     }
  // }, []);

  const getDetailBerkas = async (idBerkas: number) => {

      try {
          const response = await fetch(berkas.detail(idBerkas).url);
          const result: any = await response.json();
          setDataBerkas(result);
      } catch (error) {
          throw error;
      }
  }

  useEffect(() => {
    getDetailBerkas(data);
    return () => {
        dataBerkas;
    }
  }, [data]);
  

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
        <div className="sm:grid sm:grid-cols-5">
          <div>Instansi</div>
          <div className="sm:col-span-4">: {dataBerkas?.nama_instansi}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Nomor SPM</div>
          <div className="sm:col-span-4">: {dataBerkas?.no_spm}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Tanggal SPM</div>
          <div className="sm:col-span-4">: {dataBerkas?.tgl_spm}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Jenis SPM</div>
          <div className="sm:col-span-4">: {dataBerkas?.nama_jenis_berkas}</div>
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <div>Nilai SPM</div>
          <div className="sm:col-span-4">: Rp. {dataBerkas?.nilai_spm.toFixed(2)}</div>
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

                <tr className="border-b">
                  <td className="p-3">BIdang</td>
                  <td className="p-3">bidang</td>
                  <td className="p-3">bidang</td>
                </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export { LembarVerifikasi };