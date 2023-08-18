import { UserReadableError } from "../../errors/UserReadableError.js";

export class LoginComponent {
  constructor(auth, util, renderHandler, templateFunction, router) {
    this.auth = auth;
    this.util = util;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.loginHandler = this._loginHandler.bind(this);
    this.showView = this._showView.bind(this);
  }

  _showView() {
    let auth = this.auth.getAuth();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.router.redirect('/')
      } else {
        let template = this.templateFunction(this.loginHandler);
        this.renderHandler(template);
      }
    })
  }

  async _loginHandler(e) {
    e.preventDefault();
    let form = e.target;
    let formData = this.util.getFormData(form);
    let { email, password } = formData;
    try {
      if (this.util.formValidator(formData)) {
        const auth = this.auth.getAuth();
        this.auth.signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            this.router.navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
      }
    } catch (err) {
      alert(err);
    }
  }
}
