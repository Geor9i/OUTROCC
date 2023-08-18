import { API } from "./API.js";

export class CrudAPI extends API {
    constructor (baseUrl, path, sessionService) {
        super(baseUrl);
        this.resourceUrl = `${baseUrl}${path}`;
        this.sessionService = sessionService;
    }

    async getAll() {
        let options = {
            method: 'GET'
        }
        let result = await this.request(`${this.resourceUrl}?sortBy=_createdOn%20desc`, options);
        return result;
        }

    async getById(id) {
        let options = {
            method: 'GET'
        }
        let url = `${this.resourceUrl}/${id}`
        let result = await this.request(url, options);
        return result;
        }


        async getByName(name) {
            let options = {
                method: 'GET'
            }
            let url = `${this.resourceUrl}?where=name%20LIKE%20%22${name}%22`
            let result = await this.request(url, options);
            return result;
            }

    async create(itemData) {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.sessionService.getAccessToken()
            },
            body: JSON.stringify(itemData)
        }
        let result = await this.request(this.resourceUrl, options);
        return result;
        }

    async edit(itemData, id) {
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.sessionService.getAccessToken()
            },
            body: JSON.stringify(itemData)
        }
        let url = `${this.resourceUrl}/${id}`
        let result = await this.request(url, options);
        return result;
        }

    async delete(id) {
        let options = {
            method: 'DELETE',
            headers: {
                'X-Authorization': this.sessionService.getAccessToken()
            },
        }
        let url = `${this.resourceUrl}/${id}`
        let result = await this.request(url, options);
        return result;
        }

}