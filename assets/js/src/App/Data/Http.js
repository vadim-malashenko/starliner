export default class Http {

    static async get(url) {
        const response = await fetch(url)
        if (response.status !== 200) {
            return {
                error: {
                    code: response.status,
                    message: response.statusText
                }
            }
        }
        try {
            return await response.json()
        } catch(message) {
            return {error: {message}}
        }
    }
}