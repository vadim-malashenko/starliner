import Component from '../Component.js'
import Element from '../Element.js'
import TextInputDatalist from './TextInputDatalist.js'
import TextInput from '../Element/Control/Input/TextInput.js'
import Datalist from '../Element/Datalist.js'

export default class FromTo extends Component {

    #from
    #to
    
    constructor(from, to, cities, getCities) {

        super(from, to)

        this.onValid = this.onValid.bind(this)
        this.onInvalid = this.onInvalid.bind(this)
        this.onload = this.onload.bind(this)

        this.waitAll('valid', this.ids, this.onValid)

        const fromTextInput = new TextInput(from)
        const toTextInput = new TextInput(to)
        const citiesDatalist = new Datalist(cities, getCities)

        this.#from = new TextInputDatalist(fromTextInput, citiesDatalist)
        this.#to = new TextInputDatalist(toTextInput, citiesDatalist)

        addEventListener('load', this.onload)
    }

    get from() {
        return this.#from.value
    }

    get to() {
        return this.#to.value
    }
}