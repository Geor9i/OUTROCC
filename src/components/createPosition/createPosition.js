import { UserReadableError } from "../../errors/UserReadableError.js";

export class CreatePositionComponent {
    constructor (fireStore, db, util, renderHandler, templateFunction, router) {
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
         this.templateFunction = templateFunction;
         this.router = router;
         this.createHandler = this._createHandler.bind(this);
         this.showView = this._showView.bind(this);
    }

    _showView() {
        let template = this.templateFunction(this.createHandler);
        this.renderHandler(template);
    }

    async _createHandler(e) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);
        let { positionName } = formData;
        try {
            if (this.util.formValidator(formData)) {
                await this.fireStore.setDoc(this.fireStore.doc(this.db, "positions", positionName), {
                    name: positionName,
                });

                this.router.navigate('/');
            }

        }catch (err) {
            if (err instanceof UserReadableError) {
                alert(err.message)
            }
        }
    }

}