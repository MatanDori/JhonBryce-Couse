function init() {

}

document.getElementById("btn").addEventListener("click", () => {
    const v = document.querySelector("#input").value
    const regex = /hello[0-9]/
    const regexPhone = /^[0-9]+-[0-9]+/
    const userNameRegex = /([a-z][0-9][A-Z])+/
    const regex2 = new RegExp("hello")



    console.log(regex.test(v))
    console.log(v.match(regex))

    console.log(regexPhone.test(v))
    console.log(`username: ` + userNameRegex.test(v))

})