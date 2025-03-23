// function check(fun) {
//     if (typeof fun === 'function') {
//         fun()
//     }
// }

// function Go(){
//     console.log("check")
// }

// check(Go());


function callApi() {
    console.log(343)//1
    callApi2()
    console.log(888)//6
}

function callApi2() {
    console.log(99)//2
    callApi3()
    console.log(11)//5
}

function callApi3() {
    console.log(22)//3
   // callApi3()//infinate
    console.log(17)//4
}

callApi()
