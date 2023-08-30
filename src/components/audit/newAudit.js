import { UserReadableError } from "../../errors/UserReadableError.js";

export class NewAuditComponent {
    constructor (auth, fireStore, db, util, renderHandler, templateFunction, procedures, router) {
        this.auth = auth;
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.tests = procedures.reduce((acc, curr) => {
            acc[curr.title] = null;
            return acc;
        }, {});
        this.router = router;
        this.createHandler = this._createHandler.bind(this);
        this.addMember = this._addMember.bind(this);
        this.showView = this._showView.bind(this);
        this._getMembers().then(data => {
            this.members = data;
        })
    }

   async _showView() {
        let template = this.templateFunction(
            this.members,
            this.createHandler,
            this.addMember
            );
        this.renderHandler(template);
    }

    async _createHandler(e) {
        e.preventDefault();
        let user = this.auth.getAuth().currentUser;
        let form = e.currentTarget;
        let formData = this.util.getFormData(form);
        let { shiftStart, shiftEnd } = formData;
        let members = {};
        let memberArr = Array.from(document.querySelectorAll('.added-member'));
        memberArr.forEach((el, i) => {
            if (el.dataset.id !== undefined) {
                members[`member${i + 1}`] = this.getMember(el.dataset.id);
            }
        })
        try {
            if (this.validateMembers(members)) {
                let now = this.util.getFullDate();
                let path = this.util.encoder(`${user.email}&&${now.fullDateCode}`);
                const documentRef = this.fireStore.doc(this.db, "audits", path);
                let settings = {
                    userEmail: user.email,
                    date: now.calendarDate,
                    startTime: now.time,
                    shiftStart: shiftStart,
                    shiftEnd: shiftEnd,
                    auditEnd: false,
                    tests: this.tests
                }
                for (let member in members) {
                    let tm = members[member]
                    settings[member] = {
                        firstName: tm.firstName,
                        surname: tm.surname,
                        id: tm.id,
                        position: Object.keys(tm.positions).join(', '),
                    };
                }
                await this.fireStore.setDoc(documentRef, settings)
                this.router.navigate(`/audit/${path}`)
            }

        }catch(err) {
            if (err instanceof UserReadableError) {
                alert(err)
            }
        }
    }

    validateMembers(members) {
        let check = {
            BOH:false,
            MOH:false,
            FOH:false
        };
            for (let member in members) {
                for (let position in members[member].positions) {
                    if (check.hasOwnProperty(position)) {
                        check[position] = true;
                    }
                }
            }
        for (let position in check) {
            if (!check[position]) {
                throw new UserReadableError(`At least one ${position} required!`);
            }
        }
        let memberCount = Object.keys(members).length;
        if (memberCount < 2) {
            throw new UserReadableError(`Add At least 2 members to begin Audit!`);
        }
        return true;
    }

    _addMember(e) {
        e.preventDefault();
        let select = document.querySelector('.audit-member-select');
        let id = select.value;
        if (id) {
            let member = this.getMember(id);
            let form = document.querySelector('.audit-form');
            let submitBtn = document.querySelector('.submit-btn')
            let inputContainer = document.createElement('div');
            inputContainer.className = `added-member-container`;
            let deleteBtn = document.createElement('button');
            deleteBtn.className = `audit-delete-member-btn`;
            deleteBtn.textContent = `Delete`;
            let input = document.createElement('input');
            input.disabled = true;
            input.dataset.id = id;
            input.className = `added-member`;
            input.value = `${member.firstName} ${member.surname} ==> ${Object.keys(member.positions).join(', ')}`;
            inputContainer.appendChild(input);
            inputContainer.appendChild(deleteBtn);
            form.insertBefore(inputContainer, submitBtn);
            this.removeFromSelect(id)
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let parent = e.currentTarget.parentElement;
                input = parent.children[0];
                let select = document.querySelector('.audit-member-select');
                let option = document.createElement('option');
                option.value = input.dataset.id;
                option.textContent = input.value;
                select.appendChild(option);
                parent.remove();
            })
            return;
        }
    }

    removeFromSelect(id) {
        let selectOptions = Array.from(document.querySelectorAll('.audit-member-select option'));
        let option = selectOptions.find(el => el.value === id);
        option.remove();
    }

     getMember(id) {
        for(let member of this.members) {
            if(member.id === id) {
                return member;
            }
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