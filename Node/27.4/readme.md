# ex typescript

## Types
   Exercise: Define a Product type that has the following properties:

id (number)

name (string)

price (number)

inStock (boolean)

Then write a function printProduct(product: Product) that prints the product details nicely.

Skeleton:

```typescript
// TODO: define type Product

function printProduct(product: Product): void {
  console.log(
    `Product: ${product.name} costs $${product.price} and is ${
      product.inStock ? "available" : "out of stock"
    }.`
  );
}
```

## Interfaces
   Exercise: Create an interface called User with:

username (string)

email (string)

a method login() that returns a boolean.

Then implement a const user: User.

```typescript
// TODO: define interface User

const user: User = {
  username: "coolcat99",
  email: "coolcat@example.com",
  login() {
    return true; // Just a dummy implementation
  },
};
```

## Generics
   Exercise: Create a generic function wrapInArray that takes any value and returns it as an array of that value.

Example:

```typescript
wrapInArray(5); // returns [5]
wrapInArray("hello"); // returns ["hello"]

// TODO: define generic function wrapInArray

const result = wrapInArray("test"); // result should be ["test"]
```

## Union
   Exercise: Create a type Status that can only be "success", "error", or "loading".
   Then write a function handleStatus(status: Status) that logs different messages depending on the value.

```typescript
// TODO: define type Status

function handleStatus(status: Status): void {
  if (status === "success") {
    console.log("Everything went fine!");
  } else if (status === "error") {
    console.log("There was a problem!");
  } else if (status === "loading") {
    console.log("Loading, please wait...");
  }
}
```

## Intersection
Exercise: Create two types:

HasId with id: number

HasTimestamp with timestamp: Date

Then create a function logEntity(entity: HasId & HasTimestamp) that logs the ID and timestamp.

Skeleton:

```typescript
// TODO: define types HasId and HasTimestamp

function logEntity(entity: HasId & HasTimestamp): void {
  console.log(`Entity #${entity.id} was last updated at ${entity.timestamp}`);
}
```
