import { UserReadableError } from "../../errors/UserReadableError.js";

export class EditComponent {
    constructor (crudAPI, util, renderHandler, templateFunction, router) {
        this.crudAPI = crudAPI;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.editHandler = this._editHandler.bind(this);
        this.showView = this._showView.bind(this);
    }

    async _showView(ctx) {
        let id = ctx.params.id;
        let fruitData = await this.crudAPI.getById(id);
        let template = this.templateFunction(fruitData, this.editHandler);
        this.renderHandler(template);
    }

    async _editHandler(e, id) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);

        try {
            if (this.util.formValidator(formData)) {
                let response = await this.crudAPI.edit(formData, id);
                this.router.navigate(`/details/${id}`);
            }

        }catch (err) {
        if (err instanceof UserReadableError) {
                alert(err.message)
            }
        }
    }
}