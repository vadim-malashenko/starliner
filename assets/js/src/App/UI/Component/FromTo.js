import Component from '../Component.js'
import Element from '../Element.js'
import TextInputDatalist from './TextInputDatalist.js'
import TextInput from '../Element/Control/Input/TextInput.js'
import Datalist from '../Element/Datalist.js'

export default class FromTo extends Component {

    #from
    #to
    
    constructor(getCities, cities, ... ids) {

        super(ids)

        this.onValid = this.onValid.bind(this)
        this.onInvalid = this.onInvalid.bind(this)

        this.waitAll('valid', this.ids, this.onValid)

        const [from, to] = ids
        const fromTextInput = Element.factory(TextInput).byID(from)
        const toTextInput = Element.factory(TextInput).byID(to)
        const citiesDatalist = Element.factory(Datalist, getCities).byID(cities)

        this.#from = new TextInputDatalist(fromTextInput, citiesDatalist)
        this.#to = new TextInputDatalist(toTextInput, citiesDatalist)
    }

    get from() {
        return this.#from.value
    }

    get to() {
        return this.#to.value
    }
}