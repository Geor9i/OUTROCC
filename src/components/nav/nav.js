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
    searchTests,
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
    this.searchTests = searchTests;
    this.router = router;
    this.ctx;
    this.categories;
    this.logoutHandler = this._logoutHandler.bind(this);
    this.showView = this._showView.bind(this);
    this.getTests = this._getTests.bind(this);
    this.showTests = this._showTests.bind(this);
    this.queryBuilder = this._queryBuilder.bind(this);
    this.audit = null;
    this.outstandingAudit = this._outstandingAudit.bind(this);
    this.navDisplay = this._navDisplay.bind(this);
    this.showUserMenu = this._showUserMenu.bind(this);
    this.hideUserMenu = this._hideUserMenu.bind(this);
    this.showSideMenu = this._showSideMenu.bind(this);
    this.hideSideMenu = this._hideSideMenu.bind(this);
  }

  async _showView(ctx, next) {
    this.ctx = ctx;
    let auth = this.auth.getAuth();
    auth.onAuthStateChanged(async (user) => {
      ctx.user = user;
      if (user && ctx.path.includes('audit')) {
        this.audit = await this.outstandingAudit(user);
        this.categories = this.audit?.data.categories.reduce((acc, curr) => {
          acc[curr] = this.getTests(curr);
          return acc;
        }, {});
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
      let navTemplate = this.navDisplay();
      this.renderHandler(navTemplate(
        user,
        userData,
        this.logoutHandler,
        this.showSideMenu,
        this.hideSideMenu,
        this.showUserMenu,
        this.hideUserMenu,
        this.queryBuilder,
        this.categories,
        this.showTests,
        this.audit
      ));
      next();
    });
  }

  _showTests(e) {
    let arrow = e.currentTarget;
    let id = arrow.dataset.id;
    let parent = arrow.parentElement;
    let sibling = parent.nextElementSibling;
    if (sibling && sibling.className === 'audit-categories-tests') {
      sibling.remove()
      arrow.className = `audit-categories-arrow left`;
    } else {
      let container = document.createElement('div');
      container.className=`audit-categories-tests`;
      let categoryTests = this.getTests(id);
      categoryTests.forEach(el => {
        let test = document.createElement('a');
        test.className = 'test-link';
        test.textContent = el.title;
        container.appendChild(test)
      })
      parent.insertAdjacentElement('afterend', container);
      arrow.className = `audit-categories-arrow down`;
      container.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideSideMenu();
        this.queryBuilder(e, 'title');
      })
    }
  }

  _getTests(...params) {
    let tests = this.searchTests.search(params);
    return tests;
  }

  _queryBuilder(e, options = 'labels') {
    let link = e.target;
    let id = this.ctx.params.id;
    let param = link.textContent
    switch(options) {
      case 'labels':
        this.router.navigate(`/audit/${id}?label=${this.util.encoder(param)}`);
      break;
      case 'title':
        this.router.navigate(`/audit/${id}?title=${this.util.encoder(param)}`);
      break;
    }
  }

  _navDisplay() {
    let path = this.ctx.path;
    let querystring = this.ctx.querystring;
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
            console.log(lastDoc.id);
            return {
              id: lastDoc.id,
              data: lastDoc.data()
            };
        }
        return null;
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