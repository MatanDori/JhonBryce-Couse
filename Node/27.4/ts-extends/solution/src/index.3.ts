function wrapInArray<T>(value: T): [T] {
    return [value]
}
type Product = {
    id: number;
    name: string,
    price: number,
    inStock: boolean
}
const p: Product = { id: 11, name: "aaa", price: 11, inStock: true }
const result1 = wrapInArray(4)
const result2 = wrapInArray("Sttt")
const result3 = wrapInArray(p)

function getItemWithId<ParamType1, ParamType2>(value: ParamType1, a: number, b: ParamType2): { key1: ParamType1, key2: ParamType2 } | undefined {
    if (!a) return;
    return { key1: value, key2: b }
}


const t1 = document.querySelector<SVGElement>("aaa")
const t2 = document.querySelectorAll<SVGElement>("ccc")
const data = Array.from(t2)
const header = document.querySelector<HTMLHeadElement>("HTMLaaa")

// implement the following function using document.querySelector support Generic
function myQuerySelector<T>(idValue: string): T {
    const item = document.querySelector(idValue)
    if (!item) return {} as T
    return item;

}


function getItemWithId2(value: string | number | undefined | null): string | boolean | number | undefined | null {
    if (!value) return;
    return value
}

//0 false "" undienfed, null 
function getItemWithId3<T>(value: T): T | undefined {
    if (!value) return;
    return value
}
getItemWithId2(0)
getItemWithId2("")
const t = getItemWithId3<boolean>(false)

myQuerySelector<HTMLAnchorElement>("someId")



// Car, User, Store 
type Car = { color: string, lp: string, year: number }
type User = { userName: string, location: string, password: string }
type Store = { location: string, address: string, employees: User[] }

enum Entities {
    User = "User",
    Car = "Car",
    Store = "Store"
}


enum Errors {
    ServerError = 1,
    ClientError = 2,
    UserError = 3
}

function getData<T>(entity: Entities): (T & { id: string })[] {

    // server request
    // @ts-ignore
    return 1;

}


const stores = getData<Store>(Entities.Store)
const users = getData<User>(Entities.User)
const cars = getData<Car>(Entities.Car)



