const company = {
    "name": "IBM",
    "location": "Givatiim",
    "workers": 300
}
function AddWorkers(c){
    c.workers = c.workers + 1;
}
const newCompany = company;
AddWorkers(company)
console.log(company)
console.log(newCompany)
AddWorkers(newCompany)
console.log(company)
console.log(newCompany)
const deepCopy = structuredClone(company);
AddWorkers(deepCopy)
AddWorkers(deepCopy)
AddWorkers(deepCopy)
console.log(deepCopy)
console.log(company)


// Object.create({}) // i dont use this, old



function Company(_name, _noe, _address) {
    this.name = _name;
    this.employees = _noe;
    this.address = _address;

    this.details = function () {
        console.log("Details:", this.address);
    };

    // Corrected function name and added function call in main code
    this.lengthOfCompany = function () {
        return Object.keys(this).length;  
    };
}

// Creating instances
const company1 = new Company("Google", 300, "Tel Aviv");
const company2 = new Company("FB", 26000, "Tel Aviv");
const company3 = new Company("IBM", 16000, "Tel Aviv");
const company4 = new Company("Amazon", 6000, "Tel Aviv");

// Calling the function correctly
let len = company4.lengthOfCompany();  // <-- Fixed function name and called it
console.log("Number of properties in company4:", len);


// board
// rectangle
// arrow
// text

const board = {
    height: "500px",
    width: "500px",
    background: "white",
    createdAt: new Date().toString(),
    shapes: []
}

function RectangleShape(_location) {
    this.width = "20px"
    this.id = `rectangle-${Date.now() + Math.ceil(Math.random() * 9999)}`
    this.height = "20px"
    this.location = { x: _location.x, y: _location.y }
    this.color = "white"
    this.createdAt = new Date().toString()
}

RectangleShape.prototype.setLocation = function (_location) {
    this.location = _location
}

function TextItem(_value) {
    this.id = `text-${Date.now() + Math.ceil(Math.random() * 9999)}`
    this.value = _value
    this.fontSize = "16px"
    this.location = "center"
    this.color = "black"
    this.createdAt = new Date().toString()
}

function Arrow(_source, _target) {
    this.sourceLocation = _source.location;
    this.targetLocation = _target.location;
    this.id = `arrow-${Date.now() + Math.ceil(Math.random() * 9999)}`
    this.location = "center"
    this.thickness = "1px"
    this.type = "solid"
    this.color = "black"
    this.createdAt = new Date().toString()
}

RectangleShape.prototype.setText = function (_text) {
    this.text = _text
}

const rec1 = new RectangleShape({ x: 100, y: 100 })
rec1.setText(new TextItem("company1"))

const rec2 = new RectangleShape({ x: 100, y: 200 })
rec2.setText(new TextItem("company"))

const arrow1 = new Arrow(rec1, rec2) // implement arrow Function Constructor
board.shapes.push(rec1, rec2, arrow1)

// drag rectangle
rec1.location.x = 100;
rec1.location.y = 50

// insert all the rest of objects, 3 rectangles, 2 arrows
const rec3 = new RectangleShape({ x: 150, y: 100 })
rec3.setText(new TextItem("eithan"))
const rec4 = new RectangleShape({ x: 150, y: 0 })
rec4.setText(new TextItem("object"))
const arrow2 = new Arrow(rec3, rec4)
arrow2.setText(new TextItem("arrow company object"))
const rec5 = new RectangleShape({ x: 0, y: 0 })
rec5.setText(new TextItem("object2"))
const arrow3 = new Arrow(rec2, rec5)
arrow2.setText(new TextItem("last arrow"))

console.log(board)

