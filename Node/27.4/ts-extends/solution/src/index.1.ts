type Product = {
    id: number;
    name: string,
    price: number,
    inStock: boolean
}

function addProduct(p: Product) { }
function getProduct(something: string): Product { return {} as Product }
function getProductsByFilter(filter: string): Product[] { return [] as Array<Product> }






// interface IProduct {
//     id: number;
//     name: string,
//     price: number,
//     inStock: boolean
// }


// interface IProductApp extends IProduct {
//     stockUnit: number
// }

// const productByKalimi: IProductApp & { withId: number } = { id: 1, name: "a", price: 1, inStock: true, stockUnit: 1, withId: 111 }