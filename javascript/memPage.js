if(!sessionStorage.getItem("userId")) {
    alert("請先登入")
    window.location.href = "../logInPage/logInPage.html";
}

const dropDC = document.querySelector("#dropDownContent");
const logOut = document.querySelector("#logOutB");

window.addEventListener("click", function(e) {
    if (e.target.matches("#dropDown") || e.target.matches("#dropStyle")) {
        dropDC.classList.toggle("show");
    } else {
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

// 帶出用戶名販賣的商品

const revProId = document.querySelector("#reviseProId");

let user = {
    "userid": sessionStorage.getItem("userId")
}

fetch("http://localhost:8080/find_mem_sell", {
    method: "Post",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify(user)
})
.then(function(response) {
    return response.json()
})
.then(function(data) {
    const checkData = JSON.parse(JSON.stringify(data));
    if(checkData.message) {
        mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0"; 
    }

    const seleProId = [SCProId, revProId, deleProId, CSProId];

    if(checkData.pro_id_list) {
        checkData.pro_id_list.forEach(function(i) {
            seleProId.forEach((proId) => {
                const op = document.createElement('option');
                op.value = i;
                op.innerText = i;
                proId.appendChild(op);
            });
        })
    }
})
.catch(function(error) {
    console.log(error)
})

// 取消訂單(賣)

const SCProId = document.querySelector("#SCancelProId");

// 新增商品

const addProB = document.querySelector("#addProBtn");
const addProP = document.querySelector("#addProPict");
const addProN = document.querySelector("#addProName");
const addProS = document.querySelector("#addProStock");
const addProPr = document.querySelector("#addProPrice");
const addS1 = document.querySelector("#addSort1");
const addS2 = document.querySelector("#addSort2");
const addS3 = document.querySelector("#addSort3");
const mge = document.querySelector("#message");
const addPI = document.querySelector(".addProImg");
let addPP;

addProP.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
        addPI.src = e.target.result
        addPP = e.target.result
    }
})

addProB.addEventListener("click", function() {
    let sortList = [];

    if(addS1.value) {
        sortList.push(addS1.value)
    }

    if(addS2.value) {
        sortList.push(addS2.value)
    }

    if(addS3.value) {
        sortList.push(addS3.value)
    }

    let body = {
        "product_info": {
            "productName": addProN.value,
            "productPicture": addPP,
            "stock": addProS.value,
            "price": addProPr.value,
            "userId": sessionStorage.getItem("userId")
        },
        "sorts_name": sortList,
    }

    fetch("http://localhost:8080/add_product", {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data));
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出修改頁面選取的商品資料

const revPId = document.querySelector("#reviseProId")

revPId.addEventListener("change", function() {
    revS1.value = null;
    revS2.value = null;
    revS3.value = null;
    let body = {
        "product_id": revProId.value
    }

    fetch("http://localhost:8080/get_pro_info", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData) {
            revProN.value = checkData.product_name
            revProPr.value = checkData.price
            revProS.value = checkData.stock
            revPI.src = checkData.product_picture
            if(checkData.sort_name[0]) {
                revS1.value = checkData.sort_name[0]
            }
            if(checkData.sort_name[1]) {
                revS2.value = checkData.sort_name[1]
            }
            if(checkData.sort_name[2]) {
                revS3.value = checkData.sort_name[2]
            }
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 修改商品

const revProB = document.querySelector("#reviseProBtn");
const revProN = document.querySelector("#reviseProName");
const revProP = document.querySelector("#reviseProPict");
const revProS = document.querySelector("#reviseProStock");
const revProPr = document.querySelector("#reviseProPrice");
const revS1 = document.querySelector("#revSort1");
const revS2 = document.querySelector("#revSort2");
const revS3 = document.querySelector("#revSort3");
const revPI = document.querySelector(".revProImg");
let revPP;

// 給出下拉式選單種類的值

const sortsName = ["電子", "貴重品", "生活用品", "清潔用品", "其他"];
const sortSelect = [addS1, addS2, addS3, revS1, revS2, revS3];

sortsName.forEach((i) => {
    sortSelect.forEach((sort) => {
        const op = document.createElement('option');
        op.value = i;
        op.innerText = i;
        sort.appendChild(op);
    });
});

revProP.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
        revPI.src = e.target.result
        revPP = e.target.result
    }
})

revProB.addEventListener("click", function() {
    let sortList = [];

    if(revS1.value) {
        sortList.push(revS1.value)
    }

    if(revS2.value) {
        sortList.push(revS2.value)
    }

    if(revS3.value) {
        sortList.push(revS3.value)
    }

    let body = {
        "product_info": {
            "productId": revPId.value,
            "productName": revProN.value,
            "stock": revProS.value,
            "price": revProPr.value,
            "userId": sessionStorage.getItem("userId")
        },
        "sorts_name": sortList
    }

    if (revPP) {
        body.product_info.productPicture = revPP;
    }

    fetch("http://localhost:8080/revise_product", {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data));
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出刪除頁面選取的商品名稱

const deleProId = document.querySelector("#deleProId");
const deleProN = document.querySelector("#deleProName");
const deleProB = document.querySelector("#deleProBtn");
const proDeleM = document.querySelector("#proDeleModal");

function proDeleCheckAlert() {
    proDeleM.style.display = "flex";
    
}

function closeProDeleCheAlert() {
    proDeleM.style.display = "none";
}

deleProId.addEventListener("change", function() {
    let body = {
        "product_id": deleProId.value
    }

    fetch("http://localhost:8080/get_pro_info", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData) {
            deleProN.value = checkData.product_name
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 刪除商品

deleProB.addEventListener("click", function() {
    let body = {
        "product_info": {
            "productId": deleProId.value,
            "productName": deleProN.value,
            "userId": sessionStorage.getItem("userId")
        }
    }

    fetch("http://localhost:8080/delete_product", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data));
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出上下架商品頁面選取的商品名稱

const CSProId = document.querySelector("#chaStateProId");
const chaStaProN = document.querySelector("#chaStateProName");
const chaStaB = document.querySelector("#chaStateBtn");
const sta = document.querySelector("#state");

CSProId.addEventListener("change", function() {
    let body = {
        "product_id": CSProId.value
    }

    fetch("http://localhost:8080/get_pro_info", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData) {
            chaStaProN.value = checkData.product_name
            sta.value = checkData.state
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 上下架商品

chaStaB.addEventListener("click", function() {
    body = {
        "product_info": {
            "productId": CSProId.value,
            "userId": sessionStorage.getItem("userId"),
            "state": sta.value
        }
    }

    fetch("http://localhost:8080/change_state", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出會員原資料

const na = document.querySelector("#name");
const birth = document.querySelector("#birthDate");
const ma = document.querySelector("#mail");
const edInB = document.querySelector("#edInBtn");

let userM = {
    "member_info": {
        "userId": sessionStorage.getItem("userId")
    }
}

fetch("http://localhost:8080/find_mem_info", {
    method: "Post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userM)
})
.then(function(response) {
    return response.json()
})
.then(function(data) {
    const checkData = JSON.parse(JSON.stringify(data))
    if(checkData.member_info) {
        na.value = checkData.member_info.name
        ma.value = checkData.member_info.mail
        birth.value = checkData.member_info.birthDate
    }
})
.catch(function(error) {
    console.log(error)
})

// 修改會員資料

edInB.addEventListener("click", function() {
    body = {
        "member_info": {
            "name": na.value,
            "mail": ma.value,
            "birthDate": birth.value,
            "userId": sessionStorage.getItem("userId")
        }
    }
    
    fetch("http://localhost:8080/edit_mem_info", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 修改密碼

const pw = document.querySelector("#pwd");
const nPw = document.querySelector("#newPwd");
const nPwC = document.querySelector("#newPwdCheck");
const chPwB = document.querySelector("#chPwBtn");

chPwB.addEventListener("click", function() {
    let body = {
        "member_info": {
            "userId": sessionStorage.getItem("userId"),
            "password": pw.value
        },
        "new_pwd": nPw.value,
        "new_pwd_check": nPwC.value
    }

    fetch("http://localhost:8080/change_pwd", {
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
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 刪除用戶名

const memDeleM = document.querySelector("#memDeleModal");
const deleMemB = document.querySelector("#deleMemBtn");

function memDeleCheckAlert() {
    memDeleM.style.display = "flex";
    
}

function closeMemDeleCheAlert() {
    memDeleM.style.display = "none";
}

deleMemB.addEventListener("click", function() {
    body = {
        "member_info": {
            "userId": sessionStorage.getItem("userId")
        }
    }

    fetch("http://localhost:8080/dele_mem_info", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data))
        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
            setTimeout(function() {
                sessionStorage.removeItem("userId")
                alert("跳轉至登入頁面")
                window.location.href = "../logInPage/logInPage.html"
            },2000)
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})