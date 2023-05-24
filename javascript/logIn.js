const usId = document.querySelector("#userId");
const pwd = document.querySelector("#password");
const mge = document.querySelector("#message");
const LIB = document.querySelector("#logInButton");

const checkLISu = /登入成功/;

LIB.addEventListener("click", function() {
    body = {
        "member_info": {
            "userId": usId.value,
            "password": pwd.value
        }
    }

    fetch("http://localhost:8080/log_in", {
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
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
        }
        if(checkLISu.test(checkData.message)) {
            sessionStorage.setItem("userId", usId.value)
            setTimeout(function() {
                alert("跳轉首頁")
                window.location.href = "../index.html";
            }, 1000)
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})