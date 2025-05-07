"use strict";
// Remove UsersApiResponse and AdminsApiResponse types
// and use generic type ApiResponse in order to specify API
// response formats for each of the functions.
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAdmins = requestAdmins;
exports.requestUsers = requestUsers;
const klimi = { type: "user", name: "aaa", age: 1, occupation: "Sss" };
const admins = [
    { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
    { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];
const users = [
    {
        type: "user",
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep",
    },
    { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];
// type AdminsApiResponse =
//     | {
//         status: "success";
//         data: Admin[];
//     }
//     | {
//         status: "error";
//         error: string;
//     };
function requestAdmins(callback) {
    callback({
        status: "success",
        data: admins,
    });
}
// type UsersApiResponse =
//     | {
//         status: "success";
//         data: User[];
//     }
//     | {
//         status: "error";
//         error: string;
//     };
function requestUsers(callback) {
    callback({
        status: "success",
        data: users,
    });
}
function itsAUserOrAdmin(u) {
    if (u.type === "admin") {
        console.log(u.role);
    }
    else {
        console.log(u);
    }
}
function isAdmin(p) {
    return p.type === "admin";
}
