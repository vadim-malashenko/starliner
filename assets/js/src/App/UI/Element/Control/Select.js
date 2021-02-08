import Control from '../Control.js'

export default class Select extends Control {
    get value() {
        return this.element.value
    }

    set value(value) {
        this.element.value = value
    }

    get options() {
        return [...this.element.querySelectorAll(':scope option')]
    }

    set options(options) {
        this.inner = options.reduce((options, option) => options += `<option value="${option.id}">${option.value}</option>`, '')
    }
}