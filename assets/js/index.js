import Train from './src/API/Train.js'
import TravelInfo from './src/App/UI/Component/TravelInfo.js'
import Element from './src/App/UI/Element.js'
import Datalist from './src/App/UI/Element/Datalist.js'
import TrainNumber from './src/App/UI/Component/TrainNumber.js'

window.api = new Train()

const travelInfo = new TravelInfo(api, 'cities', 'month', 'day', 'from', 'to')

const train = new TrainNumber(api.trains, 'train')