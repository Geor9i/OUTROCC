import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { SessionService } from "./services/SessionService.js";
import { NavComponent } from "./components/nav/nav.js";
import { navTemplate } from "./components/nav/navTemplate.js";
import { HomeComponent } from "./components/home/home.js";
import { homeTemplate } from "./components/home/homeTemplate.js";
import { LoginComponent } from "./components/login/login.js";
import { loginTemplate } from "./components/login/loginTemplate.js";
import { DashboardComponent } from "./components/dashboard/dashboard.js";
import { dashBoardTemplate } from "./components/dashboard/dashboardTemplate.js";
import { RegisterComponent } from "./components/register/register.js";
import { registerTemplate } from "./components/register/registerTemplate.js";
import { Util } from "./util.js";
import { DetailsComponent } from "./components/details/details.js";
import { detailsTemplate } from "./components/details/detailsTemplate.js";
import { CreateEmployeeComponent } from "./components/createEmployee/createEmployee.js";
import { SearchComponent } from "./components/search/search.js";
import { EditComponent } from "./components/edit/edit.js";
import { searchTemplate } from "./components/search/searchTemplate.js";
import { createEmployeeTemplate} from "./components/createEmployee/createEmployeeTemplate.js";
import { editTemplate } from "./components/edit/editTemplate.js";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword , signOut, signInWithEmailAndPassword, deleteUser, updateProfile, updateEmail } from "firebase/auth";
import { CreatePositionComponent } from "./components/createPosition/createPosition.js";
import { createPositionTemplate } from "./components/createPosition/createPositionTemplate.js";
import { doc, getFirestore, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, deleteDoc  } from "firebase/firestore"; 
import { TeamMembersComponent } from "./components/teamMembers/teamMembers.js";
import { TeamMembersTemplate } from "./components/teamMembers/teamMembersTemplate.js";
import { AccountComponent } from "./components/account/account.js";
import { accountTemplate } from "./components/account/accountTemplate.js";

const firebaseConfig = {
    apiKey: "AIzaSyBt8u_aSEENqHcRKrbxOKPbt_ZBLGJEN0A",
    authDomain: "fir-test-58141.firebaseapp.com",
    projectId: "fir-test-58141",
    storageBucket: "fir-test-58141.appspot.com",
    messagingSenderId: "42703651253",
    appId: "1:42703651253:web:f708497ae189699fde99fc"
    };
    
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fireStore = {
    doc, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, deleteDoc
}
const auth = {
    getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, deleteUser, updateProfile, updateEmail
}

const main = document.querySelector('#wrapper main');
const nav = document.querySelector('#wrapper header');

//Router
const router = {
    navigate: page.show,
    redirect: page.redirect
}

//Render handlers
let renderBody = (template) => render(template, main);
let renderNav = (template) => render(template, nav);

//Services
let sessionService = new SessionService();
let util = new Util();

//Components
let navComponent = new NavComponent(auth, fireStore, db, util, renderNav, navTemplate, router);

let homeComponent = new HomeComponent(renderBody, homeTemplate);

let loginComponent = new LoginComponent(auth, util, renderBody, loginTemplate, router);

let registerComponent = new RegisterComponent(auth, fireStore, db, util, renderBody, registerTemplate, router);

let accountComponent = new AccountComponent(auth, fireStore, db, util, renderBody, accountTemplate, router);

let teamMembersComponent = new TeamMembersComponent(fireStore, db, util, renderBody, TeamMembersTemplate, router);

let dashboardComponent = new DashboardComponent(fireStore, db, renderBody, dashBoardTemplate, router);

let detailsComponent = new DetailsComponent(fireStore, db, sessionService, renderBody, detailsTemplate, router);

let searchComponent = new SearchComponent(fireStore, db, util, getAuth, renderBody, searchTemplate, router);

let createEmployeeComponent = new CreateEmployeeComponent(fireStore, db, util, renderBody, createEmployeeTemplate, router);

let createPositionComponent = new CreatePositionComponent(fireStore, db, util, renderBody, createPositionTemplate, router);

let editComponent = new EditComponent(fireStore, db, renderBody, editTemplate, router);


//Routing
page('/index.html', '/');
page(navComponent.showView);
page(`/`, homeComponent.showView);
page(`/team-members`, teamMembersComponent.showView);
page(`/dashboard`, dashboardComponent.showView);
page(`/details/:id`, detailsComponent.showView);
page(`/login`, loginComponent.showView);
page(`/register`, registerComponent.showView);
page(`/account`, accountComponent.showView);
page(`/search`, searchComponent.showView);
page(`/create-employee`, createEmployeeComponent.showView);
page(`/create-position`, createPositionComponent.showView);
page(`/edit/:id`, editComponent.showView);
page.start();
