interface User {
    id: number,
    email: string,
    age: number,
    name: string
}



const u1 = getUser(23435)

function getUser(id: number): User & { dbId: string } {
    return { id: 111, name: "eyal", email: "eyallevi@gmail.com", age: 28, dbId: "aa" }
}

interface Admin extends User {
    permissions: string
}

const eyalIsAdmin: Admin = { id: 111, name: "eyal", email: "eyallevi@gmail.com", age: 28, permissions: "admin" }

interface HTMLElement {
    tomer: boolean
}

function addUser(u: User) {
    console.log(u)
}


