import FetchDataController from './FetchDataController'
import PenerimaController from './PenerimaController'
import DataPendukungController from './DataPendukungController'
import InstansiController from './InstansiController'
import JenisBerkasController from './JenisBerkasController'
import JenisBelanjaController from './JenisBelanjaController'
import RincianBelanjaController from './RincianBelanjaController'
import SumberDanaController from './SumberDanaController'

const DataPendukung = {
    FetchDataController: Object.assign(FetchDataController, FetchDataController),
    PenerimaController: Object.assign(PenerimaController, PenerimaController),
    DataPendukungController: Object.assign(DataPendukungController, DataPendukungController),
    InstansiController: Object.assign(InstansiController, InstansiController),
    JenisBerkasController: Object.assign(JenisBerkasController, JenisBerkasController),
    JenisBelanjaController: Object.assign(JenisBelanjaController, JenisBelanjaController),
    RincianBelanjaController: Object.assign(RincianBelanjaController, RincianBelanjaController),
    SumberDanaController: Object.assign(SumberDanaController, SumberDanaController),
}

export default DataPendukung