export class SearchComponent {
    constructor (crudAPI, util, authApi, renderHandler, templateFunction, router) {
        this.crudAPI = crudAPI;
        this.util = util;
        this.authApi = authApi;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.searchHandler = this._searchHandler.bind(this);
        this.showView = this._showView.bind(this);
    }

   async _showView(ctx) {
        let queryString = ctx.querystring;
        let fruitData = [];
        if (queryString !== '') {
            let queryArr = queryString.split('=');
            let value = queryArr[1];
            fruitData = await this.crudAPI.getByName(value);
        }
        let template = this.templateFunction(fruitData, this.searchHandler);
        this.renderHandler(template);
    }

    async _searchHandler(e) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);
        let searchValue = formData.search;
        this.router.navigate(`/search?name=${searchValue}`)
    }
}