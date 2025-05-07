// Remove UsersApiResponse and AdminsApiResponse types
// and use generic type ApiResponse in order to specify API
// response formats for each of the functions.

interface User {
    type: "user";
    name: string;
    age: number;
    occupation: string;
}

const klimi: User = { type: "user", name: "aaa", age: 1, occupation: "Sss" }


interface Admin {
    type: "admin";
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
    { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
    { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

const users: User[] = [
    {
        type: "user",
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep",
    },
    { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];

export type ApiResponse<T> =
    | {
        status: "success";
        data: T[];
    }
    | {
        status: "error";
        error: string;
    };

// type AdminsApiResponse =
//     | {
//         status: "success";
//         data: Admin[];
//     }
//     | {
//         status: "error";
//         error: string;
//     };

export function requestAdmins(callback: (response: ApiResponse<Admin>) => void) {
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

export function requestUsers(callback: (response: ApiResponse<User>) => void) {
    callback({
        status: "success",
        data: users,
    });
}


function itsAUserOrAdmin(u: User | Admin) {
    if (u.type === "admin") {
        console.log(u.role)
    } else {
        console.log(u)
    }
}

function isAdmin(p: Admin | User): p is Admin {
    return p.type === "admin"
}