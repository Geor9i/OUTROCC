import { UserReadableError } from "../errors/UserReadableError.js";

export class API {
    constructor (baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(url, options) {
        
        try {
            let response = await fetch(url, options);
            if (response.status === 200) {
                return await response.json();
            } else if (response.status === 204) {
                return response
            } else {
                let result = await response.json();
                throw new UserReadableError(result.message);
            }
        }catch (err) {
            throw err
        }
    }
}