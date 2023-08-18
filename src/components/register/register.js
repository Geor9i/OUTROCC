import { UserReadableError } from "../../errors/UserReadableError.js";

export class RegisterComponent {
    constructor (auth, fireStore, db, util, renderHandler, templateFunction, router) {
        this.auth = auth;
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.registerHandler = this._registerHandler.bind(this);
        this.showView = this._showView.bind(this);
    }

    _showView() {
        let auth = this.auth.getAuth();
        auth.onAuthStateChanged(user => {
          if (user) {
            this.router.redirect('/')
          } else {
            let template = this.templateFunction(this.registerHandler);
            this.renderHandler(template);
          }
        })
        
    }

    async _registerHandler(e) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);
        let {email, password, firstName, surname} = formData
        try {
            if (this.util.formValidator(formData, 6, 're-password')) {
                const auth = this.auth.getAuth();
                const userCredential = await this.auth.createUserWithEmailAndPassword(auth, email, password, firstName, surname);

                    // Create user document in Firestore
                const usersCollection = this.fireStore.collection(this.db, 'users');
                const newUserDoc = this.fireStore.doc(usersCollection, userCredential.user.uid);
                await this.fireStore.setDoc(newUserDoc, { uid: userCredential.user.uid, firstName: firstName, surname: surname, email: email, role: 'shift-leader' });
               
                  this.router.navigate('/');
            }
        }catch(err) {
            alert(err)
        }
       
       
    }
}