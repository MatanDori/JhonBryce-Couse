let n = prompt(`Enter the number: `);
let digit = 0;
let sum = 0
while (n > 0) {
    if(n<10){
        sum = n;
    }
    else{
        digit = n%10;
        sum = sum +digit;
        num = parseInt(num/10);
    }
}
console.log("the sum of digits is: " + sum)
