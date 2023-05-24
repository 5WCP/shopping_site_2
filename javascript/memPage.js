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

    const seleProId = [revProId, deleProId, CSProId];

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

// 買家查詢已購買商品

const buyProS = document.querySelector("#buyProSta");
const searBuyB = document.querySelector("#searBuyBtn");
const resBuyP = document.querySelector("#resBuyPro");

searBuyB.addEventListener("click", () => {

    let body = {
        "userid": sessionStorage.getItem("userId"),
        "state": buyProS.value
    }

    fetch("http://localhost:8080/sear_buy_pro", {
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

        resBuyP.innerHTML = "";
        const BuyPT = document.createElement("div");
        BuyPT.classList.add("buyPro");
        resBuyP.appendChild(BuyPT);
        
        const buySPNTA = document.createElement("div");
        const buySPNT = document.createElement("p");
        buySPNT.innerText = "商品名稱";
        buySPNTA.appendChild(buySPNT);
        BuyPT.appendChild(buySPNTA);

        const buySPPTA = document.createElement("div");
        const buySPPT = document.createElement("p");
        buySPPT.innerText = "價格";
        buySPPTA.appendChild(buySPPT);
        BuyPT.appendChild(buySPPTA);

        const buySPATA = document.createElement("div");
        const buySPAT = document.createElement("p");
        buySPAT.innerText = "數量";
        buySPATA.appendChild(buySPAT);
        BuyPT.appendChild(buySPATA);

        const buySPSTA = document.createElement("div");
        const buySPST = document.createElement("p");
        buySPST.innerText = "訂單狀態";
        buySPSTA.appendChild(buySPST);
        BuyPT.appendChild(buySPSTA);

        const buySPUTA = document.createElement("div");
        const buySPUT = document.createElement("p");
        buySPUT.innerText = "更新時間";
        buySPUTA.classList.add("bPUpdA");
        buySPUTA.appendChild(buySPUT);
        BuyPT.appendChild(buySPUTA);

        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
        }

        if(checkData.cart_info_list) {
            checkData.cart_info_list.forEach( (i) => {
                const BuyP = document.createElement("div");
                BuyP.classList.add("buyPro");
                resBuyP.appendChild(BuyP);
                
                const buySPNA = document.createElement("div");
                const buySPN = document.createElement("p");
                buySPN.innerText = i.productName;
                buySPNA.appendChild(buySPN);
                BuyP.appendChild(buySPNA);

                const buySPPA = document.createElement("div");
                const buySPP = document.createElement("p");
                buySPP.innerText = i.price;
                buySPPA.appendChild(buySPP);
                BuyP.appendChild(buySPPA);

                const buySPAA = document.createElement("div");
                const buySPA = document.createElement("p");
                buySPA.innerText = i.amount;
                buySPAA.appendChild(buySPA);
                BuyP.appendChild(buySPAA);

                const buySPSA = document.createElement("div");
                const buySPS = document.createElement("p");
                buySPS.innerText = i.state;
                buySPSA.appendChild(buySPS);
                BuyP.appendChild(buySPSA);

                const buySPUA = document.createElement("div");
                const buySPU = document.createElement("p");
                buySPU.innerText = i.updateTime;
                buySPUA.classList.add("bPUpdA");
                buySPUA.appendChild(buySPU);
                BuyP.appendChild(buySPUA);
            })
        }
    })
    .catch(function(error) {
        console.log(error)
    })

})

// 取消訂單(買)
// 進到頁面先帶出可取消的訂單(未出貨還在準備中的商品)

const BCancelPB = document.querySelector("#BCancelProBtn");
const canCPA = document.querySelector("#canCancelProA");
const BCPM = document.querySelector("#BCPModal");

function BCPCheckAlert() {
    BCPM.style.display = "flex";
    
}

function closeBCPCheAlert() {
    BCPM.style.display = "none";
}

let body = {
    "userid": sessionStorage.getItem("userId"),
    "state": "準備中"
}

fetch("http://localhost:8080/sear_buy_pro", {
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
    
    canCPA.innerHTML = "";
    const canCPT = document.createElement("div");
    canCPT.classList.add("canCancelPro");
    canCPA.appendChild(canCPT);

    const canCPCTA = document.createElement("div");
    const canCPCT = document.createElement("input");
    canCPCT.type = "radio";
    canCPCT.classList.add("radioT");
    canCPCTA.appendChild(canCPCT);
    canCPT.appendChild(canCPCTA);
    
    const canCPNTA = document.createElement("div");
    const canCPNT = document.createElement("p");
    canCPNT.innerText = "商品名稱";
    canCPNTA.appendChild(canCPNT);
    canCPT.appendChild(canCPNTA);

    const canCPPTA = document.createElement("div");
    const canCPPT = document.createElement("p");
    canCPPT.innerText = "價格";
    canCPPTA.appendChild(canCPPT);
    canCPT.appendChild(canCPPTA);

    const canCPATA = document.createElement("div");
    const canCPAT = document.createElement("p");
    canCPAT.innerText = "數量";
    canCPATA.appendChild(canCPAT);
    canCPT.appendChild(canCPATA);

    const canCPSTA = document.createElement("div");
    const canCPST = document.createElement("p");
    canCPST.innerText = "訂單狀態";
    canCPSTA.appendChild(canCPST);
    canCPT.appendChild(canCPSTA);

    const canCPUTA = document.createElement("div");
    const canCPUT = document.createElement("p");
    canCPUT.innerText = "更新時間";
    canCPUTA.classList.add("bCPUpdA");
    canCPUTA.appendChild(canCPUT);
    canCPT.appendChild(canCPUTA);

    if(checkData.cart_info_list) {
        checkData.cart_info_list.forEach( (i ,index) => {
            
            const canCP = document.createElement("div");
            canCP.classList.add("canCancelPro");
            canCPA.appendChild(canCP);
        
            const canCPCA = document.createElement("div");
            const canCPC = document.createElement("input");
            canCPCA.classList.add("radioTA");
            canCPC.type = "radio";
            canCPC.id = `canCP${index}`;
            canCPC.name = "chooCP";
            canCPCA.appendChild(canCPC);
            canCP.appendChild(canCPCA);
            
            const canCPNA = document.createElement("div");
            const canCPN = document.createElement("p");
            canCPN.innerText = i.productName;
            canCPNA.appendChild(canCPN);
            canCP.appendChild(canCPNA);
        
            const canCPPA = document.createElement("div");
            const canCPP = document.createElement("p");
            canCPP.innerText = i.price;
            canCPPA.appendChild(canCPP);
            canCP.appendChild(canCPPA);
        
            const canCPAmA = document.createElement("div");
            const canCPAm = document.createElement("p");
            canCPAm.innerText = i.amount;
            canCPAmA.appendChild(canCPAm);
            canCP.appendChild(canCPAmA);
        
            const canCPSA = document.createElement("div");
            const canCPS = document.createElement("p");
            canCPS.innerText = i.state;
            canCPSA.appendChild(canCPS);
            canCP.appendChild(canCPSA);
        
            const canCPUA = document.createElement("div");
            const canCPU = document.createElement("p");
            canCPU.innerText = i.updateTime;
            canCPUA.classList.add("bCPUpdA");
            canCPUA.appendChild(canCPU);
            canCP.appendChild(canCPUA);

            BCancelPB.addEventListener("click", () => {

                const chooC = document.querySelector(`#canCP${index}`);

                if(chooC.checked) {

                    let body = {
                        "order_status": {
                            "userId": sessionStorage.getItem("userId"),
                            "productId": i.productId,
                            "updateTime": i.updateTime
                        }
                    }

                    fetch("http://localhost:8080/buy_cancel_ord", {
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
                            console.log(checkData.message);
                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }
                        canCP.innerHTML = "";
                    })
                    .catch(function(error) {
                        console.log(error)
                    })

                }
            })

        })
    }
})
.catch(function(error) {
    console.log(error)
})

// 賣家查詢出售商品和修改訂單狀態

const sellProS = document.querySelector("#sellProSta");
const searSellB = document.querySelector("#searSellBtn");
const resSellP = document.querySelector("#resSellPro");
const devSellStaB = document.querySelector("#devSellStaBtn");

searSellB.addEventListener("click", (i) => {
    let body = {
        "userid": sessionStorage.getItem("userId"),
        "state": sellProS.value
    }

    fetch("http://localhost:8080/sear_sell_pro", {
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

        resSellP.innerHTML = "";
        const sellPT = document.createElement("div");
        sellPT.classList.add("sellPro");
        resSellP.appendChild(sellPT);
    
        const sellPCTA = document.createElement("div");
        const sellPCT = document.createElement("input");
        sellPCT.type = "radio";
        sellPCT.classList.add("radioS");
        sellPCTA.appendChild(sellPCT);
        sellPT.appendChild(sellPCTA);

        const sellPBTA = document.createElement("div");
        const sellPBT = document.createElement("p");
        sellPBT.innerText = "買家(用戶名)";
        sellPBTA.appendChild(sellPBT);
        sellPT.appendChild(sellPBTA);
        
        const sellPNTA = document.createElement("div");
        const sellPNT = document.createElement("p");
        sellPNT.innerText = "商品名稱";
        sellPNTA.appendChild(sellPNT);
        sellPT.appendChild(sellPNTA);
    
        const sellPPTA = document.createElement("div");
        const sellPPT = document.createElement("p");
        sellPPT.innerText = "價格";
        sellPPTA.appendChild(sellPPT);
        sellPT.appendChild(sellPPTA);
    
        const sellPATA = document.createElement("div");
        const sellPAT = document.createElement("p");
        sellPAT.innerText = "數量";
        sellPATA.appendChild(sellPAT);
        sellPT.appendChild(sellPATA);
    
        const sellPSTA = document.createElement("div");
        const sellPST = document.createElement("p");
        sellPST.innerText = "訂單狀態";
        sellPSTA.appendChild(sellPST);
        sellPT.appendChild(sellPSTA);
    
        const sellPUTA = document.createElement("div");
        const sellPUT = document.createElement("p");
        sellPUT.innerText = "更新時間";
        sellPUTA.classList.add("CPSUpdA");
        sellPUTA.appendChild(sellPUT);
        sellPT.appendChild(sellPUTA);

        if(checkData.cart_info_list) {

            if(body.state === "準備中" || body.state === "運送中" || body.state === "待收貨") {
                devSellStaB.disabled = false;

                checkData.cart_info_list.forEach((i, index) => {
                    const sellP = document.createElement("div");
                    sellP.classList.add("sellPro");
                    resSellP.appendChild(sellP);
                
                    const sellPCA = document.createElement("div");
                    const sellPC = document.createElement("input");
                    sellPC.type = "radio";
                    sellPC.id = `cCS${index}`
                    sellPC.name = "chooCS";
                    sellPCA.appendChild(sellPC);
                    sellP.appendChild(sellPCA);
            
                    const sellPBA = document.createElement("div");
                    const sellPB = document.createElement("p");
                    sellPB.innerText = i.userId;
                    sellPBA.appendChild(sellPB);
                    sellP.appendChild(sellPBA);
                    
                    const sellPNA = document.createElement("div");
                    const sellPN = document.createElement("p");
                    sellPN.innerText = i.productName;
                    sellPNA.appendChild(sellPN);
                    sellP.appendChild(sellPNA);
                
                    const sellPPA = document.createElement("div");
                    const sellPP = document.createElement("p");
                    sellPP.innerText = i.price;
                    sellPPA.appendChild(sellPP);
                    sellP.appendChild(sellPPA);
                
                    const sellPAA = document.createElement("div");
                    const sellPA = document.createElement("p");
                    sellPA.innerText = i.amount;
                    sellPAA.appendChild(sellPA);
                    sellP.appendChild(sellPAA);
                
                    const sellPSA = document.createElement("div");
                    const sellPS = document.createElement("p");
                    sellPS.innerText = i.state;
                    sellPSA.appendChild(sellPS);
                    sellP.appendChild(sellPSA);
                
                    const sellPUA = document.createElement("div");
                    const sellPU = document.createElement("p");
                    sellPU.innerText = i.updateTime;
                    sellPUA.classList.add("CPSUpdA");
                    sellPUA.appendChild(sellPU);
                    sellP.appendChild(sellPUA);

                    devSellStaB.addEventListener("click", () => {
                        
                        const choocCS = document.querySelector(`#cCS${index}`);

                        if(choocCS.checked){
                            let body = {
                                "order_status": {
                                    "userId": i.userId,
                                    "productId": i.productId,
                                    "updateTime": i.updateTime,
                                    "state": i.state
                                }
                            }
        
                            fetch("http://localhost:8080/change_ord_state", {
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
                                sellP.innerHTML = "";
                            })
                            .catch(function(error) {
                                console.log(error)
                            })
                        }
                    })
                })
            }

            if(body.state === "已取消" || body.state === "已完成") {
                sellPCTA.parentNode.removeChild(sellPCTA);
                devSellStaB.disabled = true;

                checkData.cart_info_list.forEach((i) => {
                    const sellP = document.createElement("div");
                    sellP.classList.add("sellPro");
                    resSellP.appendChild(sellP);
    
                    const sellPBA = document.createElement("div");
                    const sellPB = document.createElement("p");
                    sellPB.innerText = i.userId;
                    sellPBA.appendChild(sellPB);
                    sellP.appendChild(sellPBA);
                    
                    const sellPNA = document.createElement("div");
                    const sellPN = document.createElement("p");
                    sellPN.innerText = i.productName;
                    sellPNA.appendChild(sellPN);
                    sellP.appendChild(sellPNA);
                
                    const sellPPA = document.createElement("div");
                    const sellPP = document.createElement("p");
                    sellPP.innerText = i.price;
                    sellPPA.appendChild(sellPP);
                    sellP.appendChild(sellPPA);
                
                    const sellPAA = document.createElement("div");
                    const sellPA = document.createElement("p");
                    sellPA.innerText = i.amount;
                    sellPAA.appendChild(sellPA);
                    sellP.appendChild(sellPAA);
                
                    const sellPSA = document.createElement("div");
                    const sellPS = document.createElement("p");
                    sellPS.innerText = i.state;
                    sellPSA.appendChild(sellPS);
                    sellP.appendChild(sellPSA);
                
                    const sellPUA = document.createElement("div");
                    const sellPU = document.createElement("p");
                    sellPU.innerText = i.updateTime;
                    sellPUA.classList.add("CPSUpdA");
                    sellPUA.appendChild(sellPU);
                    sellP.appendChild(sellPUA);
                })
            }
        }

    })
    .catch(function(error) {
        console.log(error)
    })
})

// 取消訂單(賣)
// 進到頁面先帶出可取消的訂單(未出貨還在準備中的商品)

const SCancelPB = document.querySelector("#SCancelProBtn");
const sCanCPA = document.querySelector("#sCanCancelProA");
const SCPM = document.querySelector("#SCPModal");

function SCPCheckAlert() {
    SCPM.style.display = "flex";
    
}

function closeSCPCheAlert() {
    SCPM.style.display = "none";
}

fetch("http://localhost:8080/sear_sell_pro", {
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
    
    sCanCPA.innerHTML = "";
    const sCanCPT = document.createElement("div");
    sCanCPT.classList.add("sCanCancelPro");
    sCanCPA.appendChild(sCanCPT);

    const sCanCPCTA = document.createElement("div");
    const sCanCPCT = document.createElement("input");
    sCanCPCT.type = "radio";
    sCanCPCT.classList.add("radioST");
    sCanCPCTA.appendChild(sCanCPCT);
    sCanCPT.appendChild(sCanCPCTA);

    const sCanCPBTA = document.createElement("div");
    const sCanCPBT = document.createElement("p");
    sCanCPBT.innerText = "買家(用戶名)";
    sCanCPBTA.appendChild(sCanCPBT);
    sCanCPT.appendChild(sCanCPBTA);
    
    const sCanCPNTA = document.createElement("div");
    const sCanCPNT = document.createElement("p");
    sCanCPNT.innerText = "商品名稱";
    sCanCPNTA.appendChild(sCanCPNT);
    sCanCPT.appendChild(sCanCPNTA);

    const sCanCPPTA = document.createElement("div");
    const sCanCPPT = document.createElement("p");
    sCanCPPT.innerText = "價格";
    sCanCPPTA.appendChild(sCanCPPT);
    sCanCPT.appendChild(sCanCPPTA);

    const sCanCPATA = document.createElement("div");
    const sCanCPAT = document.createElement("p");
    sCanCPAT.innerText = "數量";
    sCanCPATA.appendChild(sCanCPAT);
    sCanCPT.appendChild(sCanCPATA);

    const sCanCPSTA = document.createElement("div");
    const sCanCPST = document.createElement("p");
    sCanCPST.innerText = "訂單狀態";
    sCanCPSTA.appendChild(sCanCPST);
    sCanCPT.appendChild(sCanCPSTA);

    const sCanCPUTA = document.createElement("div");
    const sCanCPUT = document.createElement("p");
    sCanCPUT.innerText = "更新時間";
    sCanCPUTA.classList.add("sCPUpdA");
    sCanCPUTA.appendChild(sCanCPUT);
    sCanCPT.appendChild(sCanCPUTA);

    if(checkData.cart_info_list) {
        checkData.cart_info_list.forEach( (i ,index) => {
            
            const sCanCP = document.createElement("div");
            sCanCP.classList.add("sCanCancelPro");
            sCanCPA.appendChild(sCanCP);
        
            const sCanCPCA = document.createElement("div");
            const sCanCPC = document.createElement("input");
            sCanCPCA.classList.add("radioTA");
            sCanCPC.type = "radio";
            sCanCPC.id = `canSCP${index}`;
            sCanCPC.name = "chooSCP";
            sCanCPCA.appendChild(sCanCPC);
            sCanCP.appendChild(sCanCPCA);

            const sCanCPBA = document.createElement("div");
            const sCanCPB = document.createElement("p");
            sCanCPB.innerText = i.userId;
            sCanCPBA.appendChild(sCanCPB);
            sCanCP.appendChild(sCanCPBA);
            
            const sCanCPNA = document.createElement("div");
            const sCanCPN = document.createElement("p");
            sCanCPN.innerText = i.productName;
            sCanCPNA.appendChild(sCanCPN);
            sCanCP.appendChild(sCanCPNA);
        
            const sCanCPPA = document.createElement("div");
            const sCanCPP = document.createElement("p");
            sCanCPP.innerText = i.price;
            sCanCPPA.appendChild(sCanCPP);
            sCanCP.appendChild(sCanCPPA);
        
            const sCanCPAmA = document.createElement("div");
            const sCanCPAm = document.createElement("p");
            sCanCPAm.innerText = i.amount;
            sCanCPAmA.appendChild(sCanCPAm);
            sCanCP.appendChild(sCanCPAmA);
        
            const sCanCPSA = document.createElement("div");
            const sCanCPS = document.createElement("p");
            sCanCPS.innerText = i.state;
            sCanCPSA.appendChild(sCanCPS);
            sCanCP.appendChild(sCanCPSA);
        
            const sCanCPUA = document.createElement("div");
            const sCanCPU = document.createElement("p");
            sCanCPU.innerText = i.updateTime;
            sCanCPUA.classList.add("sCPUpdA");
            sCanCPUA.appendChild(sCanCPU);
            sCanCP.appendChild(sCanCPUA);

            SCancelPB.addEventListener("click", () => {

                const chooSC = document.querySelector(`#canSCP${index}`);

                if(chooSC.checked) {

                    let body = {
                        "order_status": {
                            "userId": i.userId,
                            "productId": i.productId,
                            "updateTime": i.updateTime
                        }
                    }

                    fetch("http://localhost:8080/sell_cancel_ord", {
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
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }
                        sCanCP.innerHTML = "";
                    })
                    .catch(function(error) {
                        console.log(error)
                    })

                }
            })

        })
    }
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
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
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
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
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
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
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
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
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
            setTimeout(() => {
                mge.innerHTML = "";
            }, 2000);
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
        setTimeout(() => {
            mge.innerHTML = "";
        }, 2000);
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