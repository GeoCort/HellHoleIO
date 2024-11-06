let signupBtn = document.getElementById("sign-up")
let loginBtn = document.getElementById("login-btn")
let slider= document.getElementById("slider");
let loginSection = document.getElementById("login-section")
let signUpSection = document.getElementById("sign-up-section")
signupBtn.addEventListener("click", (e)=>{
    loginSection.classList.toggle("opacity-0")
    loginSection.classList.toggle("translate-x-full")
    signUpSection.classList.toggle("opacity-0")
    signUpSection.classList.toggle("-translate-x-full")

})
loginBtn.addEventListener("click", e=>{
        loginSection.classList.toggle("opacity-0")
        loginSection.classList.toggle("translate-x-full")
        signUpSection.classList.toggle("opacity-0")
        signUpSection.classList.toggle("-translate-x-full")

})
