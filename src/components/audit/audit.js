import { UserReadableError } from "../../errors/UserReadableError.js";

export class AuditComponent {
    constructor (fireStore, db, util, renderHandler, templateFunction, procedures, router) {
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.procedures = procedures;
        this.router = router;
        this.id;
        this.data;
        this.showView = this._showView.bind(this);
        this.getMembers = this._getMembers.bind(this);
        this.getMember = this._getMember.bind(this);
        this.getTests = this._getTests.bind(this);
        this.search = this._search.bind(this);
        this.getData = this._getData.bind(this);
    }

   async _showView(ctx) {
        this.id = ctx.params.id;
        try {
            this.data = await this.getData();
            if (this.data === undefined) {
            this.router.redirect('/');
            return
            }
            let template = this.templateFunction(
                test
                );
            this.renderHandler(template);
        } catch(err) {
            alert(err)
        }
    }

    _search(keywords, method = 'labels', level = undefined) {
        let proceduresArr = Array.from(this.procedures);
        let keyCount = keywords.length;
        let buffer = [];
        for (let procedure of proceduresArr) {
            if (level && level !== procedure.score) {
                continue;
            }
            let procedureLabels = Array.from(procedure.labels).map(el => el.toLowerCase());
            let procedureTitle = procedure.title.toLowerCase();
            let counter = keyCount;
            for (let keyword of keywords) {
                keyword = keyword.toLowerCase();
                switch(method) {
                    case'labels':
                    if (procedureLabels.includes(keyword)) {
                        counter--;
                    }
                    break;
                    case'title':
                    if (procedureTitle.includes(keyword)) {
                        counter--;
                    }
                }
            }
            if(counter === 0) {
                buffer.push(procedure)
            }
        }
        return buffer;
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