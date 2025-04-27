console.log("This is ts file?");
console.log("This is ts file?");
const param: any = "Galamo"; // dont do this

const email: string = "galamouyal88@gmail.com";
const age: number = 36;
const address: { city: string; street: string; building: number } = {
  city: "Ashdod",
  street: "Dekel",
  building: 2,
};
const jobs: string[] = ["software developer", "team lead", "lecutrer"];

const car: {
  type: string;
  color: string;
  lp: string;
  year: string;
  is4On4: boolean;
} = { type: "Skoda", color: "white", lp: "12345", year: "2023", is4On4: true };

const jobLocation: { city: string; address: string } = {
  city: "Ashdod",
  address: "HomaVeMigdal",
};

const getUsers = async (): Promise<string> => {
  const data = await fetch("blablbla");
  const d = await data.json();
  return d as string;
};

console.log(getUsers);
async function init() {
  const result = await getUsers();
}
