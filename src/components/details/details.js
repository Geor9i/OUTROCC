export class DetailsComponent {
    constructor (crudAPI, sessionService , renderHandler, templateFunction, router) {
        this.crudAPI = crudAPI;
        this.sessionService = sessionService;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.showView = this._showView.bind(this);
        this.deleteHandler = this._deleteHandler.bind(this);
        this.router = router;
    }

    async _showView(ctx) {
        let fruitId = ctx.params.id;
        let fruitInfo = await this.crudAPI.getById(fruitId);
        let userId = this.sessionService.getUserData()?._id;
        let isOwner = fruitInfo._ownerId === userId ? true : false;
        let template = this.templateFunction(fruitInfo, isOwner, this.deleteHandler);
        this.renderHandler(template);
    }

    async _deleteHandler(e, id) {
        e.preventDefault();
        let result = confirm('Are you Sure?');
        if (!result) {
            return
        }
        let response = await this.crudAPI.delete(id);
        this.router.navigate('/dashboard')

    }

}