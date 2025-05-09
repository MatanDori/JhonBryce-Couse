# Create client side application
1. use TS
2. use UI to support calling each one of the API requests 
3. for example: GET /customers use fetch with the following url: `http://localhost:3000/customers` 


```javascript

fetch("http://localhost:3000/customer/nicole", { method: 'PUT' ,   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({salary:"10k"}) })

```