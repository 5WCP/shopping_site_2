if(!sessionStorage.getItem("userId")) {
    alert("請先登入")
    window.location.href = "../logInPage/logInPage.html";
}

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

    if(checkData.pro_id_list) {
        checkData.pro_id_list.forEach(function(i) {
            const revProIdOp = document.createElement('option');
            revProIdOp.value = i;
            revProIdOp.innerText = i;
            revProId.appendChild(revProIdOp);
        })
    }
})
.catch(function(error) {
    console.log(error)
})

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

revPId.addEventListener("click", function() {
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
            "productPicture": revPP,
            "stock": revProS.value,
            "price": revProPr.value,
            "userId": sessionStorage.getItem("userId")
        },
        "sorts_name": sortList
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
