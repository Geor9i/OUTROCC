import { UserReadableError } from "../../errors/UserReadableError.js";

export class CreateEmployeeComponent {
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

    async _showView() {
        let positions = await this.getPositions()
        console.log(positions);
        let template = this.templateFunction(this.createHandler, positions);
        this.renderHandler(template);
    }

    async _createHandler(e) {
        e.preventDefault();
        let form = e.target;
        let formData = this.util.getFormData(form);
        console.log(formData);
        let { firstName, surname, ...positions } = formData;
        try {
            if (this.util.formValidator(formData)) {
                const collectionRef = this.fireStore.collection(this.db, "employees");
                await this.fireStore.addDoc(collectionRef, {
                    firstName: firstName,
                    surname: surname,
                    positions
                })

                this.router.navigate('/');
            }

        }catch (err) {
            if (err instanceof UserReadableError) {
                alert(err.message)
            }
        }
    }

    async getPositions () {

        const positionCollection = this.fireStore.collection(this.db, 'positions');

        const querySnapshot  = await this.fireStore.getDocs(positionCollection);
        const positionsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
        return positionsArray;
    }
}