import FetchDataController from './FetchDataController'
import DataPendukungController from './DataPendukungController'
import PenerimaController from './PenerimaController'
import InstansiController from './InstansiController'
import JenisBerkasController from './JenisBerkasController'
import JenisBelanjaController from './JenisBelanjaController'
import RincianBelanjaController from './RincianBelanjaController'
import SumberDanaController from './SumberDanaController'

const DataPendukung = {
    FetchDataController: Object.assign(FetchDataController, FetchDataController),
    DataPendukungController: Object.assign(DataPendukungController, DataPendukungController),
    PenerimaController: Object.assign(PenerimaController, PenerimaController),
    InstansiController: Object.assign(InstansiController, InstansiController),
    JenisBerkasController: Object.assign(JenisBerkasController, JenisBerkasController),
    JenisBelanjaController: Object.assign(JenisBelanjaController, JenisBelanjaController),
    RincianBelanjaController: Object.assign(RincianBelanjaController, RincianBelanjaController),
    SumberDanaController: Object.assign(SumberDanaController, SumberDanaController),
}

export default DataPendukung