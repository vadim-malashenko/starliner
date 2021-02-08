import Element from '../Element.js'
import Select from '../Element/Control/Select.js'
import Component from '../Component.js'
import Modal from './Modal.js'

export default class TrainNumber extends Component{

    #train
    #getTrains

    #spinner = /*HTML*/`
        <div class="input-spinner_icon">
            <i class="spinner"></i>
        </div>
    `

    constructor(getTrains, ... ids) {
        super(... ids)
        this.#getTrains = getTrains
        const [train] = ids
        this.#train = Element.factory(Select).byID(train)
        this.#train.disable()
        addEventListener('travelInfo.valid', this.update.bind(this))
        addEventListener('travelInfo.invalid', this.clear.bind(this))
    }

    async clear(ev) {
        this.#train.disable()
        this.#train.options = []
    }

    async update(ev) {
        this.emit('train.update')
        this.#train.disable()
        this.#train.element.parentElement.insertAdjacentHTML('beforeend', this.#spinner)
         let response = await this.#getTrains(ev.detail)
        if (Array.isArray(response) && response.filter(t => t.length > 0).length === 0) {
            response = {
                error: {
                    message: 'В указанную дату нет поездов.'
                }
            }
        }
        if (typeof response.error !== 'undefined') {
            const errorModal = Element.factory(Modal).byID('error-modal')
            errorModal.body = `<p>${response.error.message}</p>`
            errorModal.open()
        }
        this.#train.element.parentElement.querySelector(':scope .input-spinner_icon').remove()
        if (typeof response.error === 'undefined') {
            this.#train.options = response.map(r => ({id: r, value: r}))
            this.#train.enable()
        }
        this.emit('train.updated')
    }
}