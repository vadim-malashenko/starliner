import Component from '../Component.js'
import MonthDay from './MonthDay.js'
import FromTo from './FromTo.js'

export default class TravelInfo extends Component {

    #date
    #fromTo

    constructor(api, cities, ... ids) {
        const [month, day, from, to] = ids
        ids = ['date', 'fromTo']
        super(... ids)
        this.#date = new MonthDay(month, day)
        this.#fromTo = new FromTo(api.cities, cities, from, to)
        addEventListener('train.update', ev => {
            this.#date.disable()
            this.#fromTo.disable()
        })
        addEventListener('train.updated', ev => {
            this.#date.enable()
            this.#fromTo.enable()
        })
    }

    onValid(ev) {
        this.emit(`${this._.name}.valid`, {
            month: this.#date.month,
            day: this.#date.day,
            from: this.#fromTo.from,
            to: this.#fromTo.to
        })
        this.waitAny('invalid', this.#date.ids.concat(this.#fromTo.ids), this.onInvalid)
    }
}