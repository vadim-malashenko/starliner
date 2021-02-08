export default class Template {

    #template

    constructor(template) {
        this.#template = `${template}`
    }

    html(item) {
        return item instanceof Object
            ? Object.keys (item).reduce (
                (html, key) => html.replace (new RegExp(`%${key}`, 'g'), item [key]),
                this.#template
            )
            : ''
    }
}