function findP(id) {
    for (let index = 0; index < data.products.length; index++) {
        if (data.products[index].id === id) {
            return data.products[index]
        }
    }
}

const singleObject = data.products.find((c) => c.id === 27)

// input id 27
function findPindex(id) {
    for (let index = 0; index < data.products.length; index++) {
        if (data.products[index].id === id) {
            return index
        }
    }
    return null;
}

const productIndex = data.products.findIndex((c) => c.id === 27)
if (productIndex > -1) data.products.splice(productIndex, 1)

console.log("singleObject", singleObject)


// array of products ids for all the products with price lower than 50
console.log("start ex1")
const filterResultArray = data.products.filter((currentProduct) => currentProduct.price < 5000)//סינון מוצרים ראשוני
console.log(filterResultArray);
console.log("array");
const filterId = [];//מערך של ערכי מספרי זהות
for (let index = 0; index < filterResultArray.length; index++) {
    filterId.push(filterResultShort[index].id)   //הכנסת רק ערכי מספרי הזהות אל תוך המעבר 
}
console.log(filterId)

// array of products return policies for all the products with minimumOrderQuantity > 10
console.log("start ex2")
const filterResultArray2 = data.products.filter((currentProduct) => currentProduct.minimumOrderQuantity > 10)//סינון מוצרים ראשוני
const filterPolicies = [];//מערך של ערכי מספרי זהות
for (let index = 0; index < filterResultArray2.length; index++) {
    filterPolicies.push(filterResultShort[index].returnPolicy)   //הכנסת רק ערכי מספרי הזהות אל תוך המעבר 
}
console.log(filterPolicies)

