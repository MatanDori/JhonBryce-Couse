"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// אובייקט שמכיל את האלמנטים מה-HTML
const DOM = {
    userName: null,
    password: null,
    registerResponse: null,
    loginUserName: null,
    loginPassword: null,
    loginResponse: null,
    authToken: null,
    authResponse: null,
    loadUsersButton: null,
    usersList: null
};
// פונקציה שמבצעת חיבור לאלמנטים והגדרת אירועים
function init() {
    var _a, _b, _c, _d;
    // רישום
    DOM.userName = document.querySelector("#userName");
    DOM.password = document.querySelector("#password");
    DOM.registerResponse = document.querySelector("#registerResponse");
    (_a = document.getElementById("registerAction")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const result = yield registerApi({
                userName: (_a = DOM.userName) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = DOM.password) === null || _b === void 0 ? void 0 : _b.value
            });
            DOM.registerResponse.innerText = result;
        }
        catch (ex) {
            DOM.registerResponse.innerText = ex.message;
        }
    }));
    // התחברות
    DOM.loginUserName = document.querySelector("#loginUserName");
    DOM.loginPassword = document.querySelector("#loginPassword");
    DOM.loginResponse = document.querySelector("#loginResponse");
    (_b = document.getElementById("loginAction")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const result = yield loginApi({
                userName: (_a = DOM.loginUserName) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = DOM.loginPassword) === null || _b === void 0 ? void 0 : _b.value
            });
            DOM.loginResponse.innerText = result;
        }
        catch (ex) {
            DOM.loginResponse.innerText = ex.message;
        }
    }));
    // אימות טוקן
    DOM.authToken = document.querySelector("#authToken");
    DOM.authResponse = document.querySelector("#authResponse");
    (_c = document.getElementById("authenticateAction")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const result = yield authenticateApi(((_a = DOM.authToken) === null || _a === void 0 ? void 0 : _a.value) || "");
            DOM.authResponse.innerText = result;
        }
        catch (ex) {
            DOM.authResponse.innerText = ex.message;
        }
    }));
    // שליפת משתמשים
    DOM.loadUsersButton = document.querySelector("#loadUsers");
    DOM.usersList = document.querySelector("#usersList");
    (_d = DOM.loadUsersButton) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsersApi();
        DOM.usersList.innerHTML = "";
        users.forEach((user) => {
            const li = document.createElement("li");
            li.innerText = user.userName;
            DOM.usersList.appendChild(li);
        });
    }));
}
// פונקציה לרישום משתמש
function registerApi(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        return yield response.text();
    });
}
// פונקציה להתחברות
function loginApi(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        return yield response.text();
    });
}
// פונקציה לאימות טוקן
function authenticateApi(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/api/authenticate?token=" + token);
        return yield response.text();
    });
}
// פונקציה לשליפת כל המשתמשים
function getUsersApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/users");
        return yield response.json();
    });
}
// הפעלת האתחול
init();
