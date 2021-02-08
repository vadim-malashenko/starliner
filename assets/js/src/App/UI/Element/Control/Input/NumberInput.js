import Input from '../Input.js'

export default class NumberInput extends Input {
    get max() {
        return this.element.max
    }

    set max(max) {
        this.element.max = max
    }

    get min() {
        return this.element.min
    }

    set min(min) {
        this.element.min = min
    }
}