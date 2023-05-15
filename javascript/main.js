// if(!sessionStorage.getItem("userId")) {
//     alert("請先登入")
//     window.location.href = "../logInPage/logInPage.html";
// }

document.querySelector(".dropBtn").addEventListener("click", function() {
    document.querySelector(".dropDownContent").classList.toggle("show");
})

window.addEventListener("click", function(event) {
    if (!event.target.matches(".dropBtn")) {
      let dropdowns = document.getElementsByClassName("dropDownContent");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
});