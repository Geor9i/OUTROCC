import { UserReadableError } from "../../errors/UserReadableError.js";

export class AuditComponent {
    constructor (fireStore, db, util, renderHandler, templateFunction, procedures, searchTests, router) {
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.procedures = procedures;
        this.searchTests = searchTests;
        this.router = router;
        this.id;
        this.data;
        this.showView = this._showView.bind(this);
        this.getMembers = this._getMembers.bind(this);
        this.getMember = this._getMember.bind(this);
        this.getTests = this._getTests.bind(this);
        this.getData = this._getData.bind(this);
    }

   async _showView(ctx) {
    let queryParams = ctx.querystring.split('&').map(el => this.util.encoder(el.split('=')[1], 'd'));
    let queryOption = ctx.querystring.split('&').map(el => el.split('=')[0]);
    console.log(queryParams);
    console.log(queryOption);
    // let filteredTests = this.searchTests.search(queryParams);
        this.id = ctx.params.id;
        try {
            this.data = await this.getData();
            if (this.data === undefined) {
            this.router.redirect('/');
            return
            }
            let template = this.templateFunction(
                // test
                );
            this.renderHandler(template);
        } catch(err) {
            alert(err)
        }
    }

     _getMember(id) {
        let members = Object.keys(this.data).filter(el => el.includes('member')).reduce((acc, curr) => {
            acc[curr] = this.data[curr];
            return acc;
        }, {})
        for(let member in members) {
            if(member.id === id) {
                return member;
            }
        }
    }

    async _getData() {
        const auditsDocRef = this.fireStore.doc(this.db ,'audits', this.id);
        const querySnapshot = await this.fireStore.getDoc(auditsDocRef);
        if (querySnapshot.exists()) {
           return querySnapshot.data();
        }
    }

    _getMembers() {
        let result = {};
        for (let entry in this.data) {
         if (entry.includes('member')) {
             result[entry] = this.data[entry];
         }
        }
        return result;
    }
    _getTests() {
        let result = [];
        let data = this.data.tests;
        
        for (let procedure of this.procedures) {
            if (data[procedure.title] === null) {
                result.push(procedure)
            }
        }
        return result;
    }
}