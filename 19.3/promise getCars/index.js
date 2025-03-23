function getCars(price) {
    return new Promise((resolve, reject) => {
        if (!price) {
            reject("Missing Price")
        } else {
            setTimeout(() => {
                resolve(["volvo", "mazda", "subaru", "bmw"])
            }, 5000); // 5 seconds
        }
    });
}

const handleResult = (r) => console.log("Result:", r);
const handleError = (e) => console.error("Error:", e);

getCars(123).then(handleResult).catch(handleError);
