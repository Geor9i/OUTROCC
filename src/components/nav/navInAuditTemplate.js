import { html } from "../../../node_modules/lit-html/lit-html.js";

export const navInAuditTemplate = (user, userData, logoutHandler, showSideMenu, hideSideMenu, showUserMenu, hideUserMenu, categories, showTests) => html`
    ${user
    ? html`
     <div class="menu-button" @click=${showSideMenu}>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>`
    : html``
    }

    <div class="side-menu-container" @click=${hideSideMenu}></div>
        <div class="side-menu">
            <nav class="nav">
                <div class="home-button">
                    <a href="/" @click=${hideSideMenu}><h3>OUTROCC</h3></a>
                </div>
                <div class="audit-categories-main-container">
                ${categories ? 
                Object.keys(categories).map(el => {
                    return html`
                        <div class="audit-categories-container">
                            <a class="category-link" @click=${(e) => {
                                hideSideMenu();
                            }}>${el}</a>
                            <div class="audit-categories-arrow left" data-id="${el}" @click=${showTests}></div>
                        </div>`
                }): html``
                }
                </div>
            </nav>
        </div>
        ${user
        ? html`
         <div class="user-menu-container">
            <div class="user-menu-nav" @click=${showUserMenu}><h4>${userData?.initial}</h4></div>
            <div class="user-menu inactive">
                <div class="user-menu-email-container"><h4>${userData?.email}</h4></div>
                <div class="user-menu-account-container">
                    <div><a @click=${hideUserMenu} href="/account">Account</a></div>
                    <div><a href="" @click=${logoutHandler}>Logout</a>
                </div>
                </div>
        </div>
            </div>
        <div @click=${hideUserMenu} class="user-menu-cover">
        </div>`
        : html`
        <div class="user-menu-container">
            <a class="login-nav" href="/login">Login</a>
        </div>`
    }`;
