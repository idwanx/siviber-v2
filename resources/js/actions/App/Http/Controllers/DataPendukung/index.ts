import FetchDataController from './FetchDataController'
import InstansiController from './InstansiController'
import JenisBerkasController from './JenisBerkasController'
import JenisBelanjaController from './JenisBelanjaController'
import RincianBelanjaController from './RincianBelanjaController'
import SumberDanaController from './SumberDanaController'
import PenerimaController from './PenerimaController'

const DataPendukung = {
    FetchDataController: Object.assign(FetchDataController, FetchDataController),
    InstansiController: Object.assign(InstansiController, InstansiController),
    JenisBerkasController: Object.assign(JenisBerkasController, JenisBerkasController),
    JenisBelanjaController: Object.assign(JenisBelanjaController, JenisBelanjaController),
    RincianBelanjaController: Object.assign(RincianBelanjaController, RincianBelanjaController),
    SumberDanaController: Object.assign(SumberDanaController, SumberDanaController),
    PenerimaController: Object.assign(PenerimaController, PenerimaController),
}

export default DataPendukung