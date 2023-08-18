import { UserReadableError } from "../../errors/UserReadableError.js";

export class TeamMembersComponent {
    constructor (fireStore, db, util, renderHandler, templateFunction, router) {
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
         this.templateFunction = templateFunction;
         this.router = router;
         this.showView = this._showView.bind(this);
         this.getMembers = this._getMembers.bind(this);
    }

    async _showView(ctx) {
        let members = this.getMembers();
        let template = this.templateFunction(members);
        if (ctx.user) {
            this.renderHandler(template);
        }
    }
    
    async _getMembers () {

        const membersCollection = this.fireStore.collection(this.db, 'members');
        const querySnapshot = await this.fireStore.getDocs(membersCollection);
        const positionsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
        return positionsArray;
    }

}