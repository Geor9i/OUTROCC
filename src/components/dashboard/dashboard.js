
export class DashboardComponent {
    constructor (crudAPI, renderHandler, templateFunction, router) {
        this.crudAPI = crudAPI;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.showView = this._showView.bind(this);
    }

    async _showView() {
        const shoeData = await this.crudAPI.getAll();
        let template = this.templateFunction(shoeData);
        this.renderHandler(template);
       
    }


}