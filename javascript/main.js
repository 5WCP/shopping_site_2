if(!sessionStorage.getItem("userId")) {
    alert("請先登入")
    window.location.href = "../logInPage/logInPage.html";
}

const dropB = document.querySelector(".dropBtn");
const dropDC = document.querySelector(".dropDownContent");
const logOut = document.querySelector("#logOutB");

dropB.addEventListener("click", function() {
    dropDC.classList.toggle("show");
})

// window.addEventListener("click", function(event) {
//     if (!event.target.matches(".dropBtn")) {
//       let dropdowns = document.getElementsByClassName("dropDownContent");
//       for (let i = 0; i < dropdowns.length; i++) {
//         let openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains("show")) {
//           openDropdown.classList.remove("show");
//         }
//       }
//     }
// });

window.addEventListener("click", function(event) {
    if (!event.target.matches(".dropBtn")) {
        if (dropDC.classList.contains("show")) {
            dropDC.classList.remove("show");
        }
    }
});

logOut.addEventListener("click", function() {
    sessionStorage.removeItem("userId");
    alert("已登出，進入登入頁面")
    window.location.href = "../logInPage/logInPage.html";
})