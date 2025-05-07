"use strict";
function wrapInArray(value) {
    return [value];
}
const p = { id: 11, name: "aaa", price: 11, inStock: true };
const result1 = wrapInArray(4);
const result2 = wrapInArray("Sttt");
const result3 = wrapInArray(p);
function getItemWithId(value, a, b) {
    if (!a)
        return;
    return { key1: value, key2: b };
}
const t1 = document.querySelector("aaa");
const t2 = document.querySelectorAll("ccc");
const data = Array.from(t2);
const header = document.querySelector("HTMLaaa");
// implement the following function using document.querySelector support Generic
function myQuerySelector(idValue) {
    const item = document.querySelector(idValue);
    if (!item)
        return {};
    return item;
}
function getItemWithId2(value) {
    if (!value)
        return;
    return value;
}
//0 false "" undienfed, null 
function getItemWithId3(value) {
    if (!value)
        return;
    return value;
}
getItemWithId2(0);
getItemWithId2("");
const t = getItemWithId3(false);
myQuerySelector("someId");
var Entities;
(function (Entities) {
    Entities["User"] = "User";
    Entities["Car"] = "Car";
    Entities["Store"] = "Store";
})(Entities || (Entities = {}));
var Errors;
(function (Errors) {
    Errors[Errors["ServerError"] = 1] = "ServerError";
    Errors[Errors["ClientError"] = 2] = "ClientError";
    Errors[Errors["UserError"] = 3] = "UserError";
})(Errors || (Errors = {}));
function getData(entity) {
    // server request
    // @ts-ignore
    return 1;
}
const stores = getData(Entities.Store);
const users = getData(Entities.User);
const cars = getData(Entities.Car);
