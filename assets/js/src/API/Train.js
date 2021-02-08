import Cities from '../App/Data/Service/Cities.js'
import Trains from '../App/Data/Service/Trains.js'
import Routes from '../App/Data/Service/Routes.js'

export default class Train {

    #cities
    #trains
    #routes

    constructor() {
        this.#cities = new Cities()
        this.#trains = new Trains()
        this.#routes = new Routes()
    }

    get cities() {
        return async () => await this.#cities.get()
    }

    get trains() {
        return async (travelInfo) => await this.#trains.get(travelInfo)
    }

    get routes() {
        return async (train, travelInfo) => await this.#routes.get({train, ... travelInfo})
    }
}