export class NavComponent {
    constructor (auth, fireStore, db, util, renderHandler, templateFunction, router) {
        this.auth = auth;
        this.fireStore = fireStore;
        this.db = db;
        this.util = util;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router;
        this.logoutHandler = this._logoutHandler.bind(this);
        this.showView = this._showView.bind(this);
        this.showUserMenu = this._showUserMenu.bind(this);
        this.showSideMenu = this._showSideMenu.bind(this);
        this.hideSideMenu = this._hideSideMenu.bind(this);
       
    }

    async _showView(ctx, next) {
        let auth = this.auth.getAuth();
        auth.onAuthStateChanged(async user => {
        ctx.user = user;
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
            userData.initial = userData.firstName.slice(0,1).toUpperCase();
        }
        let template = this.templateFunction(
            user,
            userData,
            this.logoutHandler,
            this.showSideMenu,
            this.hideSideMenu,
            this.showUserMenu
        );
        this.renderHandler(template);
        next();
        })
    }

    _showSideMenu() {
        let sideMenu = document.querySelector('.side-menu');
        let sideMenuContainer = document.querySelector('.side-menu-container');
        this.util.addRemoveClass(sideMenu, 'side-menu-active');
        this.util.toggleSettings(sideMenuContainer, {'width': {on: "100%", off: '0%'}});
    }

    _hideSideMenu() {
        let sideMenuContainer = document.querySelector('.side-menu-container');
        let sideMenu = document.querySelector('.side-menu');
        sideMenu.classList.remove('side-menu-active');
        sideMenuContainer.style.width = '0%';
         }

        _showUserMenu() {
            let userMenu = document.querySelector('.user-menu');
            this.util.addRemoveClass(userMenu, 'inactive');
        }

    async _logoutHandler(e) {
        e.preventDefault();
        const auth = this.auth.getAuth();
        this.auth.signOut(auth).then(() => {
        // Sign-out successful.
        this.router.navigate('/');
        }).catch((error) => {
        alert(error.message)
        });
    }
}