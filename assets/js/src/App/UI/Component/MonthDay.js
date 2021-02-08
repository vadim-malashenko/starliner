import Component from '../Component.js'
import Select from '../Element/Control/Select.js'
import NumberInput from '../Element/Control/Input/NumberInput.js'

export default class MonthDay extends Component {

    #month
    #day
    
    constructor(month, day) {

        super(month, day)

        this.onValid = this.onValid.bind(this)
        this.onInvalid = this.onInvalid.bind(this)
        this.onload = this.onload.bind(this)

        this.waitAll('valid', this.ids, this.onValid)

        this.#month = new Select(month)
        this.#day = new NumberInput(day)

        this.#month.on('changed', this.onMonthChange.bind(this))
        this.updateMonth()
        this.onMonthChange()
        this.#day.on('change', this.onDayChange(this))
        this.onload()
    }

    get month() {
        return this.#month.value
    }

    get day() {
        return this.#day.value
    }

    onMonthChange(ev) {
        const month = this.#month.value
        if (month >= 1 && month <= 12) {
            this.emit('month.valid')
        } else {
            this.emit('month.invalid', 'month')
        }
    }

    onDayChange(ev) {
        const month = this.#month.value
        const day = this.#day.value
        if (day >= 1 && day <= new Date(new Date().getFullYear(), month, 0).getDate()) {
            this.emit('day.valid')
        } else {
            this.emit('day.invalid', 'day')
        }
    }

    updateMonth() {
        this.#month.disable()
        const today = new Date()
        this.#month.on('change', this.updateDay.bind(this))
        this.#month.options = [... Array(12).keys()]
            .map(i => ({
                id: i + 1,
                value: new Intl
                    .DateTimeFormat('ru', {month: 'long'})
                    .format(new Date(today.getFullYear(), i))
                    .toUpperCase()
            }))
        this.#month.value = today.getMonth() + 1
        this.updateDay()
        this.#day.value = today.getDate()
        this.#month.enable()
    }

    updateDay = () => {
        this.#day.disable()
        const today = new Date()
        this.#day.min = 1
        this.#day.max = new Date(today.getFullYear(), this.#month.value, 0).getDate()
        if (this.#day.value > this.#day.max) {
            this.#day.value = this.#day.max
        }
        this.#day.enable()
    }
}