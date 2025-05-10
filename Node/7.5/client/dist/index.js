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
const DOM = {
    userName: null,
    password: null,
    registerResponse: null
};
function init() {
    var _a;
    DOM.userName = document.querySelector("#userName");
    DOM.password = document.querySelector("#password");
    DOM.registerResponse = document.querySelector("#registerResponse");
    (_a = document.getElementById("registerAction")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const result = yield registerApi({ userName: (_a = DOM.userName) === null || _a === void 0 ? void 0 : _a.value, password: (_b = DOM.password) === null || _b === void 0 ? void 0 : _b.value });
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = result;
            }
        }
        catch (ex) {
            if (DOM.registerResponse) {
                DOM.registerResponse.innerText = ex.message;
            }
        }
    }));
}
function registerApi(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawResponse = yield fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const content = yield rawResponse.text();
        return content;
    });
}
init();
