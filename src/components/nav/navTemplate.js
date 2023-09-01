import { html } from "../../../node_modules/lit-html/lit-html.js";

export const navTemplate = (user, userData, logoutHandler, showSideMenu, hideSideMenu, showUserMenu, hideUserMenu, categories, showTests, outstandingAudit) => html`
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
                        <a href="/performance-tracker" @click=${hideSideMenu}>Performance tracker</a>
                        <a href="/team-members" @click=${hideSideMenu}>Team members</a>
                        <a href="/audit" @click=${hideSideMenu}>Audits</a>
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
            }`