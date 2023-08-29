export class NavComponent {
  constructor(
    auth,
    fireStore,
    db,
    util,
    renderHandler,
    navTemplate,
    navAuditTemplate,
    navInAuditTemplate,
    router
  ) {
    this.auth = auth;
    this.fireStore = fireStore;
    this.db = db;
    this.util = util;
    this.renderHandler = renderHandler;
    this.navTemplate = navTemplate;
    this.navAuditTemplate = navAuditTemplate;
    this.navInAuditTemplate = navInAuditTemplate;
    this.router = router;
    this.logoutHandler = this._logoutHandler.bind(this);
    this.showView = this._showView.bind(this);
    this.outstandingAudit = this._outstandingAudit.bind(this);
    this.navDisplay = this._navDisplay.bind(this);
    this.showUserMenu = this._showUserMenu.bind(this);
    this.hideUserMenu = this._hideUserMenu.bind(this);
    this.showSideMenu = this._showSideMenu.bind(this);
    this.hideSideMenu = this._hideSideMenu.bind(this);
  }

  async _showView(ctx, next) {
    let path = ctx.path;
    let auth = this.auth.getAuth();
    auth.onAuthStateChanged(async (user) => {
      ctx.user = user;
      let outstandingAudit;
      if (user && path.includes('audit')) {
        outstandingAudit = await this.outstandingAudit(user);
      }
      let uid = user?.uid;
      let userData = null;
      let userDocRef;
      let docSnapshot;
      if (uid) {
        userDocRef = this.fireStore.doc(this.db, "users/" + uid);
        docSnapshot = await this.fireStore.getDoc(userDocRef);
      }
      if (docSnapshot?.exists()) {
        userData = docSnapshot.data();
        userData.initial = userData.firstName.slice(0, 1).toUpperCase();
      }
      let navTemplate = this.navDisplay(ctx);
      this.renderHandler(navTemplate(
        user,
        userData,
        this.logoutHandler,
        this.showSideMenu,
        this.hideSideMenu,
        this.showUserMenu,
        this.hideUserMenu,
        outstandingAudit
      ));
      next();
    });
  }

  _navDisplay(ctx) {
    let path = ctx.path;
    let querystring = ctx.querystring;
    let result;
    let idBasedPath = path.substr(7);
    switch (path) {
      case `/audit/${idBasedPath}`:
        result = this.navInAuditTemplate;
        break;
      case `/audit/${idBasedPath}?${querystring}`:
        result = this.navInAuditTemplate;
        break;
      case "/audit":
        result = this.navAuditTemplate;
        break;
      default:
        result = this.navTemplate;
        break;
    }
    return result;
  }

  async _outstandingAudit(user) {
        const auditRef = this.fireStore.collection(this.db, 'audits');
        const q = this.fireStore.query(auditRef, this.fireStore.where('userEmail', '==', user.email), this.fireStore.where('auditEnd', '==', false));
        const querySnapshot = await this.fireStore.getDocs(q);
        if (!querySnapshot.empty) {
            const docs = querySnapshot.docs
            const lastDoc = docs[docs.length - 1];
            return {
              id: lastDoc.id,
              data: lastDoc.data()
            };
        }
        return undefined;
  }

  _showSideMenu() {
    let sideMenu = document.querySelector(".side-menu");
    let sideMenuContainer = document.querySelector(".side-menu-container");
    sideMenu.classList.add("side-menu-active");
    sideMenuContainer.style.width = "100%";
  }

  _hideSideMenu() {
    let sideMenuContainer = document.querySelector(".side-menu-container");
    let sideMenu = document.querySelector(".side-menu");
    sideMenu.classList.remove("side-menu-active");
    sideMenuContainer.style.width = "0%";
  }

  _showUserMenu() {
    let userMenu = document.querySelector(".user-menu");
    let userMenuCover = document.querySelector(".user-menu-cover");
    userMenu.classList.remove("inactive");
    userMenuCover.style.width = "100%";
    userMenuCover.style.height = "100vh";
  }

  _hideUserMenu() {
    let userMenu = document.querySelector(".user-menu");
    let userMenuCover = document.querySelector(".user-menu-cover");
    userMenu.classList.add("inactive");
    userMenuCover.style.width = "0%";
    userMenuCover.style.height = "0vh";
  }

  async _logoutHandler(e) {
    e.preventDefault();
    const auth = this.auth.getAuth();
    this.auth
      .signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.router.navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}