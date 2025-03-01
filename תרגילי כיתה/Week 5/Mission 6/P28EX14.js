function reverseNumber(n) {
    let strNum = n.toString().split('');   // המרה למחרוזת והפרדה בין מספר למספר
    strNum = strNum.reverse(); // היפוך סדר התווים במערך
    strNum = strNum.join(''); // חיבור חזרה למחרוזת
    let reversedNum = parseInt(strNum); // המרת המחרוזת למספר שלם
    
    return reversedNum;
}
let n = prompt("please enter a number: ");
let n_update = parseInt(n);
let new_n = reverseNumber(n_update);
console.log("old number: " + n_update + " new number: " + new_n);