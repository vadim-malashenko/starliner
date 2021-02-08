import MonthDay from './App/UI/Component/MonthDay.js'
import FromTo from './App/UI/Component/FromTo.js'
import TrainNumber from './App/UI/Component/TrainNumber.js'
import Train from './API/Train.js'

export default class App {

    #api
    #date
    #fromTo
    #train

    constructor() {

        this.#api = new Train()

        this.#date = new MonthDay('month', 'day')
        this.#fromTo = new FromTo('from', 'to', 'cities', this.#api.cities)
        this.#train = new TrainNumber('train', this.#api.trains)

        addEventListener('train.update', ev => {
            this.#date.disable()
            this.#fromTo.disable()
        })

        addEventListener('train.updated', ev => {
            this.#date.enable()
            this.#fromTo.enable()
        })
    }

    static load(ev) {
        ev.target.app = new App()
    }
}