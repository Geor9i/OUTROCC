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
        this.scores = {};
        this.id;
        this.data;
        this.showView = this._showView.bind(this);
        this.runAudit = this._runAudit.bind(this);
        this.testAnswer = this._testAnswer.bind(this);
        this.getMembers = this._getMembers.bind(this);
        this.getMember = this._getMember.bind(this);
        this.getTests = this._getTests.bind(this);
        this.getData = this._getData.bind(this);
    }

   async _showView(ctx) {
        this.id = encodeURIComponent(ctx.params.id);
        let linkContainer = document.querySelector('.nav .audit-categories-main-container');
        linkContainer.addEventListener('click',this.NavLinkHandler)
        try {
            this.data = await this.getData();
            this.scores = this.data.tests;
            console.log(this.scores);
            if (this.data === undefined) {
            this.router.redirect('/');
            return
            }
            this.runAudit();
        } catch(err) {
            alert(err)
        }
    }

    NavLinkHandler(e) {
        e.preventDefault();
        if (e.target.tagName === "A") {
            let link = e.target;
            let category = link.dataset.id;
            let isCategory = link.className === 'category-link' ? true : false;
        }
    }

    _runAudit() {
        let categories = this.data.categories;
        //run audit in order of categories
        for (let category of categories) {
            let tests = this.testCollection(category);
            for(let test of tests) {
                if (!this.scores.hasOwnProperty(category) || 
                !this.scores[category].hasOwnProperty(test.title)
                ){
                    let currentTest = this.testOptionsFilter(test, category);
                    let template = this.templateFunction(category, currentTest, this.testAnswer);
                    this.renderHandler(template);
                    return
                }
            }
        }
    }

    testCollection(category) {
        let tests = this.searchTests.search(category);
        const labelOrder = ["floor", "general", "product", "temperature", "health and safety", "brand standard"];
        let result = [];
        for(let label of labelOrder) {
                let buffer = tests.filter(test => {
                    if (test.labels.includes(label) && !result.includes(test)) {
                        return true;
                    }
                })
                result.push(...buffer);
            }
            return result;
    }

    testOptionsFilter(test, category) {
        let result = JSON.parse(JSON.stringify(test))
        let common = test.options.common;
        let categoryTests = [];
        if (test.options.hasOwnProperty(category)) {
            categoryTests = test.options[category]
        }
        result.options = [...common, ...categoryTests];
        return result;
    }

    async _testAnswer(e) {
        let element = e.currentTarget.children[0];
        let title = document.querySelector('.audit-question').textContent;
        let category = document.querySelector('.audit-question').dataset.category;
        let score = document.querySelector('.audit-question').dataset.id;
        score = element.textContent === 'Not Observed' ? 'p' : score;
        try {
            let documentRef = this.fireStore.doc(this.db, 'audits', this.id);
            await this.fireStore.updateDoc(documentRef, {
                [`tests.${category}.${title}`] : score
            })
            if (!this.scores.hasOwnProperty(category)) {
                this.scores[category] = {}
            }
            this.scores[category][title] =  score;
            console.log(this.scores);
            this.runAudit();
        }catch(err) {
            alert(err)
        }
       
    }

    queryHandler(ctx) {
        if (ctx.querystring === '') {
            return null;
        }
        let queryParams = ctx.querystring?.split('&').map(el => this.util.encoder(el.split('=')[1], 'd'));
        let queryOption = ctx.querystring?.split('&').map(el => el.split('=')[0])[0];
        let filteredTests = this.searchTests.search(queryParams, queryOption);
        return filteredTests
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