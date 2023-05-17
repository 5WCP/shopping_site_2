const usId = document.querySelector("#userId");
const pwd = document.querySelector("#password");
const pwdC = document.querySelector("#pwdCheck");
const na = document.querySelector("#name");
const ma = document.querySelector("#mail");
const birth = document.querySelector("#birthDate");
const mge = document.querySelector("#message");
const SUB = document.querySelector("#signUpButton");

const checkSUSu = /註冊成功/;

SUB.addEventListener("click", function(){
    let body = {
        "member_info": {
            "userId": usId.value,
            "password": pwd.value,
            "name": na.value,
            "mail": ma.value,
            "birthDate": birth.value
        },
        "pwd_check": pwdC.value
    }
    fetch("http://localhost:8080/sign_up", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data));
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }

        if(checkSUSu.test(checkData.message)) {
            setTimeout(function() {
                alert("跳轉到登入頁面")
                window.location.href = "../logInPage/logInPage.html";
            }, 1000)
        }
        
    })
    .catch(function(error) {
        console.log(error)
    })
})