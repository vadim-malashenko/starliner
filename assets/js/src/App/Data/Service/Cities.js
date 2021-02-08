import Service from '../Service.js'

export default class Cities extends Service {

    static URL = '/cities'

    async get (data) {
        return (await super.get(data)).reduce(
            (list, city) => {
                const hash = city.value.substr(0, 3)
                if (typeof list[hash] === 'undefined') {
                    list[hash] = []
                }
                list[hash].push(city)
                return list
            },
            {}
        )
    }
}