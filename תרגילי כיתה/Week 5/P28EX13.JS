// let num = prompt(`Enter the number: `);
// let digit = prompt(`Enter the digit: `);
// let count = 0;
// while (num > 0) {
//     if(digit === num%10){
//         count++;
//         num = parseInt(num/10);
//     }
// }
// console.log("the num of shwons is: " + count)
function CheckStringLength(str){
    if(str.length>10){
        console.log("Too long, make it shorter!");
    }
    else{
        console.log(str);
    }
}
let str = prompt(`Enter the string: `);
CheckStringLength(str);
