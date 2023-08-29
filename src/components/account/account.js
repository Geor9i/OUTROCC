import { UserReadableError } from "../../errors/UserReadableError.js";

export class AccountComponent {
    constructor (auth, fireStore, db, util, renderHandler, templateFunction, router) {
        this.auth = auth;
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.showView = this._showView.bind(this);
        this.deleteHandler = this._deleteHandler.bind(this);
        this.editInfoHandler = this._editInfoHandler.bind(this);
        this.editEmailHandler = this._editEmailHandler.bind(this);
        this.changePassword = this._changePassword.bind(this);
        this.router = router;
    }

    async _showView(ctx) {

        let auth = this.auth.getAuth();
        let uid = auth.currentUser?.uid;
        let userDocRef = this.fireStore.doc(this.db, "users/" + uid);
        let docSnapshot = await this.fireStore.getDoc(userDocRef);
        let employee = docSnapshot.data();

        let template = this.templateFunction(employee, this.editInfoHandler, this.editEmailHandler, this.changePassword, this.deleteHandler);
        this.renderHandler(template);
    }

    async _deleteHandler(e, employee) {
        e.preventDefault();
        let result = confirm('You are about to delete your account. Are you sure?');
        if (!result) {
            return
        }
        try {
            const auth = this.auth.getAuth();
            const user = auth.currentUser;
            await this.auth.deleteUser(user);
            await this.fireStore.deleteDoc(this.fireStore.doc(this.db, "users", employee.uid));
            this.router.navigate('/')
        }catch(err) {
            if (err instanceof UserReadableError) {
                alert(err)
            }
        }
        this.router.navigate('/')

    }
    async _editInfoHandler(e, employee) {
        e.preventDefault();
        let uid = employee.uid;
        let form = e.target;
        let formData = this.util.getFormData(form);
        let { firstName, surname } = formData;
        try {
            if (this.util.formValidator(formData)) {
                let result = confirm('Are you Sure?');
                if (!result) {
                    return
                }
                const docRef = this.fireStore.doc(this.db, 'users', uid);
                await this.fireStore.updateDoc(docRef, {
                    firstName: firstName,
                    surname: surname,
                })
                    this.router.navigate('/');
                }
        this.router.navigate('/');
            }catch(err) {
                if (err instanceof UserReadableError) {
                    alert(err)
                }
            }

    }

    async _editEmailHandler(e, employee) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);
        try {
            if (this.util.formValidator(formData)) {
            let result = confirm('Are you Sure?');
            if (!result) {
                return
            }
                let { email } = formData;
                const auth = this.auth.getAuth();
                await this.auth.updateEmail(auth.currentUser, email);
                let uid = employee.uid;
                const docRef = this.fireStore.doc(this.db, 'users', uid);
                    await this.fireStore.updateDoc(docRef, {
                        email: email,
                    })
                this.router.navigate('/');
            }
        } catch(err) {
            if (err instanceof UserReadableError) {
                alert(err)
            }
        }
    }

    async _changePassword(e) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);
        try {
            if (this.util.formValidator(formData, 6, 'repass')) {
            let result = confirm('Change you password?');
            if (!result) {
                return
            }
                let { password } = formData;
                const auth = this.auth.getAuth();
                await this.auth.updatePassword(auth.currentUser, password);
                this.router.navigate('/');
            }
        }catch(err) {
                alert(err)
        }
    }
}