import Element from '../Element.js'
import Modal from '../Component/Modal.js'

export default class Datalist extends Element {

    #map
    #_list

    list(hash) {
        let list = this.#map[hash]
        if ( ! Array.isArray(list)) {
            list = []
        }
        if (list !== this.#_list) {
            this.update(list)
        }
        return list
    }

    constructor(id, getList) {
        super(id)
        getList().then(response => {
            if (typeof response.error !== 'undefined') {
                const errorModal = Element.factory(Modal).byID('error-modal')
                errorModal.body = `<p>${response.error.message}</p>`
                errorModal.open()
                return
            }
            this.#map = response
            this.emit(`${this.element.id}.load`)
        })
    }

    update(list) {
        if (Array.isArray(list)) {
            this.#_list = list
            this.inner = list.reduce(
                (options, option) => options += `
                <option data-id="${option.id}" value="${option.value}">
                    ${option.value}
                </option>
            `,
                ''
            )
        }
    }

    clear() {
        this.inner = ''
    }
}