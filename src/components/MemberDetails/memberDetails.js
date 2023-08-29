export class MemberDetailsComponent {
    constructor (fireStore, db, util, renderHandler, templateFunction, router) {
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.showView = this._showView.bind(this);
        this.openDetails = this._openDetails.bind(this);
        this.deleteHandler = this._deleteHandler.bind(this);
        this.router = router;
    }

    async _showView(ctx) {
        let memberId = ctx.params.id;
        
        let userDocRef = this.fireStore.doc(this.db, "members/" + memberId);
        let docSnapshot = await this.fireStore.getDoc(userDocRef);
        let member = docSnapshot.data();

        let template = this.templateFunction(member, this.openDetails, this.deleteHandler);
        this.renderHandler(template);
    }

    async _openDetails(e) {
        e.preventDefault();
        let detailsContainer = document.querySelector('.member-details-details_performance-container')
        this.util.addRemoveClass(detailsContainer, 'inactive');
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