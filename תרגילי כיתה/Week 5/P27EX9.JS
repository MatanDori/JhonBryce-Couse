function BigIndex() {
    let maxIndex = 1;//checker index
    let highestNumber = 0;//flag for max number
    let count = 1
    const NUMBERS = 3   
    while (count <= NUMBERS) {//getting the numbers
        let n = prompt(`Enter the num number ${count}:`);
                
                
        if (highestNumber < n) {
            highestNumber = n;
            maxIndex = count
        }
        
        count++;//מעבר למספר הבא
    }
    
    console.log(`The most big number is: ${highestNumber} with a index of ${maxIndex}`);
}

BigIndex();
