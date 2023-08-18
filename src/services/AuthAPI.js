import { API } from "./API.js";

export class AuthAPI extends API {
    constructor (baseUrl, path, sessionService) {
        super(baseUrl);
        this.path = path;
        this.sessionService = sessionService;
    }

    isUser() {
        let user = this.sessionService.getUserData();
        if (user) {
            if (user.accessToken) {
                return true;
            }
        }
        return false;
    }

    
    async loginRequest(userData) {
        let url = `${this.baseUrl}/users/login`;
        let option = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userData)
        }
        let result = await this.request(url, option);
        this.sessionService.setUserData(result)
        return result;
    }

    async registerRequest(userData) {
        let url = `${this.baseUrl}/users/register`;
        let option = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userData)
        }
        let result = await this.request(url, option);
        this.sessionService.setUserData(result);
        return result;
    }

    async logoutRequest() {
        if (this.isUser()) {
            let accessToken = this.sessionService.getAccessToken();
            if (accessToken) {
                let url = `${this.baseUrl}/users/logout`;
                let option = {
                    method: 'GET',
                    headers: {
                        'X-Authorization': accessToken
                    }
                }
                let result = await this.request(url, option);
                if (result.status === 204){
                    this.sessionService.removeUserData();

                }
                return result;
            }
        }
        }
}