import DashboardController from './DashboardController'
import Berkas from './Berkas'
import DataPendukung from './DataPendukung'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    Berkas: Object.assign(Berkas, Berkas),
    DataPendukung: Object.assign(DataPendukung, DataPendukung),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers