"use strict";
console.log("This is ts file?");
console.log("This is ts file?");
const param = "Galamo"; // dont do this
const email = "galamouyal88@gmail.com";
const age = 36;
const address = {
    city: "Ashdod",
    street: "Dekel",
    building: 2,
};
const jobs = ["software developer", "team lead", "lecutrer"];
const car = { type: "Skoda", color: "white", lp: "12345", year: "2023", is4On4: true };
const jobLocation = {
    city: "Ashdod",
    address: "HomaVeMigdal",
};
const getUsers = async () => {
    const data = await fetch("blablbla");
    const d = await data.json();
    return d;
};
console.log(getUsers);
async function init() {
    const result = await getUsers();
}
