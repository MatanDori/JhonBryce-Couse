function numSmaller(n1 , n2){
    if(n1>n2){
        return n2;
    }
    return n1;
}
function numBigger(n1 , n2){
    if(n1>n2){
        return n1;
    }
    return n2;
}
function Ex26(n1 , n2){
        //נראה מי יותר גדול
    let first = numSmaller(n1 , n2);
    let last = numBigger(n1 , n2);
    console.log("for ex26");
    for (let index = first; index <= last; index++) {
        console.log(index)   
    }
}
function Ex27(n1 , n2){
    //נראה מי יותר גדול
    let first = numSmaller(n1 , n2);
    let last = numBigger(n1 , n2);
    console.log("for ex27");
        //הדפסה בסדר עולה
    for (let index = first; index <= last; index++) {
        console.log(index)   
    }
    //הדפסה בסדר יורד
    for (let index = last; index => first; index--) {
        console.log(index)   
    }
}

//Ex28 
let july2000 = [30, 32, 31, 29, 28, 33, 35, 36, 31, 30, 29, 28, 27, 32, 31, 30, 34, 35, 33, 29, 30, 32, 31, 30, 33, 34, 35, 36, 37, 38];
let july2001 = [31, 33, 30, 28, 29, 34, 36, 37, 32, 31, 30, 29, 28, 33, 32, 31, 35, 36, 34, 30, 31, 33, 32, 31, 34, 35, 36, 37, 38, 39];
function Ex28AVG2000(arr1)
{
    sum = 0;
    avg = 0;
    for (let index = 0; index < arr.length; index++) {
        sum = sum + arr[i];
    }
    avg = sum/(arr.length)
    return avg;
}
function Ex28Comparison(arr1 , arr2){
    // מציאת הימים ביולי 2001 עם טמפרטורה גבוהה מהממוצע של יולי 2000
    let hotDays = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2[i] >  Ex28AVG2000(arr1)) {
            hotDays.push(i + 1); // הוספת מספר היום (הימים מתחילים מ-1)
        }
    }
    console.log("the chosen days are: " + hotDays)
}

let num1 = prompt("please enter number: ");
let num2 = prompt("please enter number: ");
Ex26(num1 , num2);
Ex27(num1 , num2);
Ex28AVG200(july2000 , july2001);
Ex28Comparison(july2000 , july2001)
