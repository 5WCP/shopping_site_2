// 未登入 跳轉首頁

if(!sessionStorage.getItem("userId")) {
    alert("請先登入")
    window.location.href = "../logInPage/logInPage.html";
}

// 下拉式選單

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

// 登出

logOut.addEventListener("click", function() {
    sessionStorage.removeItem("userId");
    alert("已登出，進入登入頁面")
    window.location.href = "../logInPage/logInPage.html";
})

// 驗證碼程式

function randomNum(min,max) {
    return Math.floor( Math.random()*(max-min)+min);
}

function randomColor(min,max) {
    let r = randomNum(min,max);
    let g = randomNum(min,max);
    let b = randomNum(min,max);
    return "rgb("+r+","+g+","+b+")";
}

// 刪除商品驗證碼

const im = document.querySelector("#verImg");
const i = document.querySelector("#proDeleVer");
let verRes = "";

let code = "";

function verify() {
    let iU = i.value.toUpperCase();

    function clearAndUpdate() {
        i.value = "";
        drawPic();
    }

    if(iU.trim().length === 0) {
        mge.innerHTML = "\u00A0請輸入驗證碼\u00A0";
        setTimeout(() => {
           mge.innerHTML = ""; 
        }, 2000);
        clearAndUpdate();
        
    } else if (iU.length !== 5) {
        mge.innerHTML = "\u00A0請輸入正確格式的驗證碼\u00A0";
        setTimeout(() => {
           mge.innerHTML = ""; 
        }, 2000);  
        clearAndUpdate();
        
    } else if (iU === code) {
        verRes = "PASS";
        clearAndUpdate();
        
    } else { 
        mge.innerHTML = "\u00A0驗證碼錯誤\u00A0";
        setTimeout(() => {
           mge.innerHTML = ""; 
        }, 2000);
        clearAndUpdate()
    }   
}

im.onclick = function(e) {
e.preventDefault();
drawPic();
};

function drawPic() {
    
    const w = im.width;
    const h = im.height;

    let img = im.getContext("2d");
    img.textBaseline = 'bottom'; 
    img.fillStyle = randomColor(200,240); 
    img.fillRect(0,0,w,h);
    
    let str = "ABCEFGHJKLMNPQRSTWXY123456789";
    code = "";
    
    for(let i = 0; i < 5; i++) {
        
        let txt = str[randomNum(0,str.length)];
        code += txt;
        img.fillStyle = randomColor(39,108);
        img.font = randomNum(15,20)+'px SimHei';
        
        let x = 10+i*20;
        let y = randomNum(20,30);
        let deg = randomNum(-45, 45);
        
        img.translate(x,y);
        img.rotate(deg*Math.PI/180);
        img.fillText(txt, 0, 0);

        img.rotate(-deg*Math.PI/180);
        img.translate(-x,-y);
        }

    for(let i = 0; i < 3; i++) {
        img.strokeStyle = randomColor(40,180);
        img.beginPath();
        img.moveTo( randomNum(0,w), randomNum(0,h) );
        img.lineTo( randomNum(0,w), randomNum(0,h) );
        img.stroke();
    }
    
    for(let i = 0; i < 26; i++) {
        img.fillStyle = randomColor(0,255);
        img.beginPath();
        img.arc(randomNum(0,w),randomNum(0,h), 1, 0, 2*Math.PI);
        img.fill();
    }
}

// 停用會員驗證碼

const imM = document.querySelector("#verImgM");
const iM = document.querySelector("#memDeleVer");
let verResM = "";

let codeM = "";

function verifyM() {
    let iUM = iM.value.toUpperCase();

    function clearAndUpdateM() {
        iM.value = "";
        drawPicM();
    }

    if(iUM.trim().length === 0) {
        mge.innerHTML = "\u00A0請輸入驗證碼\u00A0";
        setTimeout(() => {
            mge.innerHTML = ""; 
         }, 2000);
        clearAndUpdateM();
        
    } else if (iUM.length !== 5) {
        mge.innerHTML = "\u00A0請輸入正確格式的驗證碼\u00A0";
        setTimeout(() => {
            mge.innerHTML = ""; 
         }, 2000);   
        clearAndUpdateM();
        
    } else if (iUM === codeM) {
        verResM = "PASS";
        clearAndUpdateM();
        
    } else { 
        mge.innerHTML = "\u00A0驗證碼錯誤\u00A0";
        setTimeout(() => {
            mge.innerHTML = ""; 
         }, 2000);
        clearAndUpdateM()
    }   
}

imM.onclick = function(e) {
e.preventDefault();
drawPicM();
};

function drawPicM() {
    
    const wM = imM.width;
    const hM = imM.height;

    let imgM = imM.getContext("2d");
    imgM.textBaseline = 'bottom'; 
    imgM.fillStyle = randomColor(200,240); 
    imgM.fillRect(0,0,wM,hM);
    
    let strM = "ABCEFGHJKLMNPQRSTWXY123456789";
    codeM = "";
    
    for(let i = 0; i < 5; i++) {
        
        let txtM = strM[randomNum(0,strM.length)];
        codeM += txtM;
        imgM.fillStyle = randomColor(39,108);
        imgM.font = randomNum(15,20)+'px SimHei';
        
        let xM = 10+i*20;
        let yM = randomNum(20,30);
        let degM = randomNum(-45, 45);
        
        imgM.translate(xM,yM);
        imgM.rotate(degM*Math.PI/180);
        imgM.fillText(txtM, 0, 0);

        imgM.rotate(-degM*Math.PI/180);
        imgM.translate(-xM,-yM);
        }

    for(let i = 0; i < 3; i++) {
        imgM.strokeStyle = randomColor(40,180);
        imgM.beginPath();
        imgM.moveTo( randomNum(0,wM), randomNum(0,hM) );
        imgM.lineTo( randomNum(0,wM), randomNum(0,hM) );
        imgM.stroke();
    }
    
    for(let i = 0; i < 26; i++) {
        imgM.fillStyle = randomColor(0,255);
        imgM.beginPath();
        imgM.arc(randomNum(0,wM),randomNum(0,hM), 1, 0, 2*Math.PI);
        imgM.fill();
    }
}

// 帶出用戶名販賣的商品

const revProN = document.querySelector("#reviseProName");
const deleProN = document.querySelector("#deleProName");
const chaStaProN = document.querySelector("#chaStateProName");

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
        setTimeout(() => {
            mge.innerHTML = "";
        }, 2000);
    }

    const seleProN = [revProN, deleProN, chaStaProN];

    if(checkData.pro_name_set) {
        checkData.pro_name_set.forEach(function(i) {
            seleProN.forEach((proN) => {
                const op = document.createElement("option");
                op.value = i;
                op.innerText = i;
                proN.appendChild(op);
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

        if(checkData.ord_num_info_list) {
            checkData.ord_num_info_list.forEach((i) => {
                let ordNTotP = 0;

                const ordNA = document.createElement("div");
                ordNA.classList.add("ordNArea");
                resBuyP.appendChild(ordNA);

                const ordN = document.createElement("div");
                const ordNP = document.createElement("p");
                ordNP.innerText = "訂單編號 : " + i.orderNumber;
                ordN.classList.add("ordN");
                ordN.appendChild(ordNP);
                ordNA.appendChild(ordN);

                const ordS = document.createElement("div");
                const ordSP = document.createElement("p");
                ordSP.innerText = "訂單狀態 : " + i.state;
                ordS.classList.add("ordN");
                ordS.appendChild(ordSP);
                ordNA.appendChild(ordS);

                const ordPh = document.createElement("div");
                const ordPhP = document.createElement("p");
                ordPhP.innerText = "賣家電話 : " + i.phone;
                ordPh.classList.add("ordN");
                ordPh.appendChild(ordPhP);
                ordNA.appendChild(ordPh);

                const ordP = document.createElement("div");
                ordP.classList.add("ordPro");
                ordNA.appendChild(ordP);

                const ordPN = document.createElement("p");
                ordPN.innerText = "商品名稱";
                ordP.appendChild(ordPN);

                const ordPP = document.createElement("p");
                ordPP.innerText = "價格";
                ordP.appendChild(ordPP);

                const ordPA = document.createElement("p");
                ordPA.innerText = "數量";
                ordP.appendChild(ordPA);

                const ordPT = document.createElement("p");
                ordPT.innerText = "總計";
                ordP.appendChild(ordPT);


                i.proInfoList.forEach( (j) => {
                    
                    const ordP = document.createElement("div");
                    ordP.classList.add("ordPro");
                    ordNA.appendChild(ordP);

                    const ordPN = document.createElement("p");
                    ordPN.innerText = j.productName;
                    ordP.appendChild(ordPN);

                    const ordPP = document.createElement("p");
                    ordPP.innerText = j.price;
                    ordP.appendChild(ordPP);

                    const ordPA = document.createElement("p");
                    ordPA.innerText = j.amount;
                    ordP.appendChild(ordPA);

                    const ordPT = document.createElement("p");
                    ordPT.innerText = (j.price * j.amount);
                    ordP.appendChild(ordPT);

                    ordNTotP += (j.price * j.amount);
                })

                const ordNTP = document.createElement("div");
                ordNTP.classList.add("totalP");
                ordNTP.innerText = "訂單總金額為 : $ " + ordNTotP;
                ordNA.appendChild(ordNTP);

                const ordA = document.createElement("div");
                const ordAP = document.createElement("p");
                ordAP.innerText = "寄件地址 : " + i.address;
                ordA.classList.add("ordN");
                ordA.appendChild(ordAP);
                ordNA.appendChild(ordA);

                const ordU = document.createElement("div");
                const ordUP = document.createElement("p");
                const upTime = i.updateTime.replace("T", " ");
                ordUP.innerText = "訂單更新時間 : " + upTime;
                ordU.classList.add("ordN");
                ordU.appendChild(ordUP);
                ordNA.appendChild(ordU);
                
            })

        }

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

    if(checkData.ord_num_info_list) {
        checkData.ord_num_info_list.forEach((i,index) => {
            let ordNTotP = 0;

            const ordNA = document.createElement("div");
            ordNA.classList.add("ordNArea");
            canCPA.appendChild(ordNA);

            const ordNC = document.createElement("input");
            ordNC.classList.add("ordNC");
            ordNC.type = "radio";
            ordNC.id = `bcho${index}`;
            ordNC.name = "ordNC";
            ordNA.appendChild(ordNC);

            const ordN = document.createElement("div");
            const ordNP = document.createElement("p");
            ordNP.innerText = "訂單編號 : " + i.orderNumber;
            ordN.classList.add("ordN");
            ordN.appendChild(ordNP);
            ordNA.appendChild(ordN);

            const ordS = document.createElement("div");
            const ordSP = document.createElement("p");
            ordSP.innerText = "訂單狀態 : " + i.state;
            ordS.classList.add("ordN");
            ordS.appendChild(ordSP);
            ordNA.appendChild(ordS);

            const ordPh = document.createElement("div");
            const ordPhP = document.createElement("p");
            ordPhP.innerText = "賣家電話 : " + i.phone;
            ordPh.classList.add("ordN");
            ordPh.appendChild(ordPhP);
            ordNA.appendChild(ordPh);

            const ordP = document.createElement("div");
            ordP.classList.add("ordPro");
            ordNA.appendChild(ordP);

            const ordPN = document.createElement("p");
            ordPN.innerText = "商品名稱";
            ordP.appendChild(ordPN);

            const ordPP = document.createElement("p");
            ordPP.innerText = "價格";
            ordP.appendChild(ordPP);

            const ordPA = document.createElement("p");
            ordPA.innerText = "數量";
            ordP.appendChild(ordPA);

            const ordPT = document.createElement("p");
            ordPT.innerText = "總計";
            ordP.appendChild(ordPT);


            i.proInfoList.forEach( (j) => {
                
                const ordP = document.createElement("div");
                ordP.classList.add("ordPro");
                ordNA.appendChild(ordP);

                const ordPN = document.createElement("p");
                ordPN.innerText = j.productName;
                ordP.appendChild(ordPN);

                const ordPP = document.createElement("p");
                ordPP.innerText = j.price;
                ordP.appendChild(ordPP);

                const ordPA = document.createElement("p");
                ordPA.innerText = j.amount;
                ordP.appendChild(ordPA);

                const ordPT = document.createElement("p");
                ordPT.innerText = (j.price * j.amount);
                ordP.appendChild(ordPT);

                ordNTotP += (j.price * j.amount);
            })

            const ordNTP = document.createElement("div");
            ordNTP.classList.add("totalP");
            ordNTP.innerText = "訂單總金額為 : $ " + ordNTotP;
            ordNA.appendChild(ordNTP);

            const ordA = document.createElement("div");
            const ordAP = document.createElement("p");
            ordAP.innerText = "寄件地址 : " + i.address;
            ordA.classList.add("ordN");
            ordA.appendChild(ordAP);
            ordNA.appendChild(ordA);

            const ordU = document.createElement("div");
            const ordUP = document.createElement("p");
            const upTime = i.updateTime.replace("T", " ");
            ordUP.innerText = "訂單更新時間 : " + upTime;
            ordU.classList.add("ordN");
            ordU.appendChild(ordUP);
            ordNA.appendChild(ordU);

            const bChooCa = document.querySelector(`#bcho${index}`);
            
            BCancelPB.addEventListener("click", () => {

                if(bChooCa.checked) {

                    let body = {
                        "order_status": {
                            "orderNumber": i.orderNumber
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
                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                            ordNA.innerHTML = "";
                            ordNA.classList.remove("ordNArea");
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                }
            })
        })
    }

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

        if(checkData.ord_num_info_list) {
            checkData.ord_num_info_list.forEach((i,index) => {
                let ordNTotP = 0;
                devSellStaB.style.display = "inline"; 

                const ordNA = document.createElement("div");
                ordNA.classList.add("ordNArea");
                resSellP.appendChild(ordNA);

                const ordNC = document.createElement("input");
                ordNC.classList.add("ordNC");
                ordNC.type = "radio";
                ordNC.id = `chSta${index}`;
                ordNC.name = "ordNC";
                ordNA.appendChild(ordNC);

                const ordN = document.createElement("div");
                const ordNP = document.createElement("p");
                ordNP.innerText = "訂單編號 : " + i.orderNumber;
                ordN.classList.add("ordN");
                ordN.appendChild(ordNP);
                ordNA.appendChild(ordN);

                const ordS = document.createElement("div");
                const ordSP = document.createElement("p");
                ordSP.innerText = "訂單狀態 : " + i.state;
                ordS.classList.add("ordN");
                ordS.appendChild(ordSP);
                ordNA.appendChild(ordS);

                const ordPh = document.createElement("div");
                const ordPhP = document.createElement("p");
                ordPhP.innerText = "買家電話 : " + i.phone;
                ordPh.classList.add("ordN");
                ordPh.appendChild(ordPhP);
                ordNA.appendChild(ordPh);

                const ordP = document.createElement("div");
                ordP.classList.add("ordPro");
                ordNA.appendChild(ordP);

                const ordPN = document.createElement("p");
                ordPN.innerText = "商品名稱";
                ordP.appendChild(ordPN);

                const ordPP = document.createElement("p");
                ordPP.innerText = "價格";
                ordP.appendChild(ordPP);

                const ordPA = document.createElement("p");
                ordPA.innerText = "數量";
                ordP.appendChild(ordPA);

                const ordPT = document.createElement("p");
                ordPT.innerText = "總計";
                ordP.appendChild(ordPT);


                i.proInfoList.forEach( (j) => {
                    
                    const ordP = document.createElement("div");
                    ordP.classList.add("ordPro");
                    ordNA.appendChild(ordP);

                    const ordPN = document.createElement("p");
                    ordPN.innerText = j.productName;
                    ordP.appendChild(ordPN);

                    const ordPP = document.createElement("p");
                    ordPP.innerText = j.price;
                    ordP.appendChild(ordPP);

                    const ordPA = document.createElement("p");
                    ordPA.innerText = j.amount;
                    ordP.appendChild(ordPA);

                    const ordPT = document.createElement("p");
                    ordPT.innerText = (j.price * j.amount);
                    ordP.appendChild(ordPT);

                    ordNTotP += (j.price * j.amount);
                })

                const ordNTP = document.createElement("div");
                ordNTP.classList.add("totalP");
                ordNTP.innerText = "訂單總金額為 : $ " + ordNTotP;
                ordNA.appendChild(ordNTP);

                const ordA = document.createElement("div");
                const ordAP = document.createElement("p");
                ordAP.innerText = "寄件地址 : " + i.address;
                ordA.classList.add("ordN");
                ordA.appendChild(ordAP);
                ordNA.appendChild(ordA);

                const ordU = document.createElement("div");
                const ordUP = document.createElement("p");
                const upTime = i.updateTime.replace("T", " ");
                ordUP.innerText = "訂單更新時間 : " + upTime;
                ordU.classList.add("ordN");
                ordU.appendChild(ordUP);
                ordNA.appendChild(ordU);

                const chStaChoo = document.querySelector(`#chSta${index}`);
            
                devSellStaB.addEventListener("click", () => {
    
                    if(chStaChoo.checked) {
    
                        let body = {
                            "order_status": {
                                "orderNumber": i.orderNumber
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
                            const checkData = JSON.parse(JSON.stringify(data));
                            if(checkData.message) {
                                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                ordNA.innerHTML = "";
                                ordNA.classList.remove("ordNArea");
                                setTimeout(() => {
                                    mge.innerHTML = "";
                                }, 2000);
                            }
                        })
                        .catch(function(error) {
                            console.log(error)
                        })
                    }
                })

                if(sellProS.value === "已完成" || sellProS.value === "已取消") {
                    ordNC.style.display = "none";
                    devSellStaB.style.display = "none"; 
                }
                
            })

        }

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

    if(checkData.ord_num_info_list) {
        checkData.ord_num_info_list.forEach((i,index) => {
            let ordNTotP = 0;

            const ordNA = document.createElement("div");
            ordNA.classList.add("ordNArea");
            sCanCPA.appendChild(ordNA);

            const ordNC = document.createElement("input");
            ordNC.classList.add("ordNC");
            ordNC.type = "radio";
            ordNC.id = `scho${index}`;
            ordNC.name = "ordNC";
            ordNA.appendChild(ordNC);

            const ordN = document.createElement("div");
            const ordNP = document.createElement("p");
            ordNP.innerText = "訂單編號 : " + i.orderNumber;
            ordN.classList.add("ordN");
            ordN.appendChild(ordNP);
            ordNA.appendChild(ordN);

            const ordS = document.createElement("div");
            const ordSP = document.createElement("p");
            ordSP.innerText = "訂單狀態 : " + i.state;
            ordS.classList.add("ordN");
            ordS.appendChild(ordSP);
            ordNA.appendChild(ordS);

            const ordPh = document.createElement("div");
            const ordPhP = document.createElement("p");
            ordPhP.innerText = "買家電話 : " + i.phone;
            ordPh.classList.add("ordN");
            ordPh.appendChild(ordPhP);
            ordNA.appendChild(ordPh);

            const ordP = document.createElement("div");
            ordP.classList.add("ordPro");
            ordNA.appendChild(ordP);

            const ordPN = document.createElement("p");
            ordPN.innerText = "商品名稱";
            ordP.appendChild(ordPN);

            const ordPP = document.createElement("p");
            ordPP.innerText = "價格";
            ordP.appendChild(ordPP);

            const ordPA = document.createElement("p");
            ordPA.innerText = "數量";
            ordP.appendChild(ordPA);

            const ordPT = document.createElement("p");
            ordPT.innerText = "總計";
            ordP.appendChild(ordPT);


            i.proInfoList.forEach( (j) => {
                
                const ordP = document.createElement("div");
                ordP.classList.add("ordPro");
                ordNA.appendChild(ordP);

                const ordPN = document.createElement("p");
                ordPN.innerText = j.productName;
                ordP.appendChild(ordPN);

                const ordPP = document.createElement("p");
                ordPP.innerText = j.price;
                ordP.appendChild(ordPP);

                const ordPA = document.createElement("p");
                ordPA.innerText = j.amount;
                ordP.appendChild(ordPA);

                const ordPT = document.createElement("p");
                ordPT.innerText = (j.price * j.amount);
                ordP.appendChild(ordPT);

                ordNTotP += (j.price * j.amount);
            })

            const ordNTP = document.createElement("div");
            ordNTP.classList.add("totalP");
            ordNTP.innerText = "訂單總金額為 : $ " + ordNTotP;
            ordNA.appendChild(ordNTP);

            const ordA = document.createElement("div");
            const ordAP = document.createElement("p");
            ordAP.innerText = "寄件地址 : " + i.address;
            ordA.classList.add("ordN");
            ordA.appendChild(ordAP);
            ordNA.appendChild(ordA);

            const ordU = document.createElement("div");
            const ordUP = document.createElement("p");
            const upTime = i.updateTime.replace("T", " ");
            ordUP.innerText = "訂單更新時間 : " + upTime;
            ordU.classList.add("ordN");
            ordU.appendChild(ordUP);
            ordNA.appendChild(ordU);

            const sChooCa = document.querySelector(`#scho${index}`);
            
            SCancelPB.addEventListener("click", () => {

                if(sChooCa.checked) {

                    let body = {
                        "order_status": {
                            "orderNumber": i.orderNumber
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
                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                            ordNA.innerHTML = "";
                            ordNA.classList.remove("ordNArea");
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                }
            })
        })
    }

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

addS1.addEventListener("change", () => {
    if(addS1.value !== "") {
        addS2.disabled = false
    } else {
        addS2.disabled = true
        addS2.value = ""
        addS3.disabled = true
        addS3.value = ""
    }
})

addS2.addEventListener("change", () => {
    if(addS2.value !== "") {
        addS3.disabled = false
    } else {
        addS3.disabled = true
        addS3.value = ""
    }
})

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

        addPI.src = "";
        addProN.value = "";
        addProS.value = "";
        addProPr.value = "";
        addS1.value = "";
        addS2.value = "";
        addS3.value = "";
        addProP.value = "";

        const checkData = JSON.parse(JSON.stringify(data));

        if(checkData.message) {
            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
            setTimeout(() => {
                mge.innerHTML = "";
            },2000)

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
                    setTimeout(() => {
                        mge.innerHTML = "";
                    }, 2000);
                }
            
                const seleProN = [revProN, deleProN, chaStaProN];

                revProN.innerHTML = "";
                deleProN.innerHTML = "";
                chaStaProN.innerHTML = "";
                const rNullOp = document.createElement("option");
                const dNullOp = document.createElement("option");
                const cNullOp = document.createElement("option");
                revProN.appendChild(rNullOp);
                deleProN.appendChild(dNullOp);
                chaStaProN.appendChild(cNullOp);
            
                if(checkData.pro_name_set) {
                    checkData.pro_name_set.forEach(function(i) {
                        seleProN.forEach((proN) => {
                            const op = document.createElement('option');
                            op.value = i;
                            op.innerText = i;
                            proN.appendChild(op);
                        });
                    })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 選取商品名稱帶出商品代碼清單

revProN.addEventListener("change", function() {
    let body = {
        "product_info": {
            "productName": revProN.value
        }
    }

    fetch("http://localhost:8080/name_to_id", {
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

        if(checkData.pro_id_list) {
            checkData.pro_id_list.forEach( (i) => {
                const op = document.createElement("option");
                op.value = i;
                op.innerText = i;
                revProId.appendChild(op);
            })
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出修改頁面選取的商品資料

const revProId = document.querySelector("#reviseProId");

revProId.addEventListener("change", function() {
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
const revProP = document.querySelector("#reviseProPict");
const revProS = document.querySelector("#reviseProStock");
const revProPr = document.querySelector("#reviseProPrice");
const revS1 = document.querySelector("#revSort1");
const revS2 = document.querySelector("#revSort2");
const revS3 = document.querySelector("#revSort3");
const revPI = document.querySelector(".revProImg");
let revPP;

revS1.addEventListener("change", () => {
    if(revS1.value !== "") {
        revS2.disabled = false
    } else {
        revS2.disabled = true
        revS2.value = ""
        revS3.disabled = true
        revS3.value = ""
    }
})

revS2.addEventListener("change", () => {
    if(revS2.value !== "") {
        revS3.disabled = false
    } else {
        revS3.disabled = true
        revS3.value = ""
    }
})

// 給出下拉式選單種類的值

const sortsName = ["電子", "貴重品", "生活用品", "清潔用品", "寵物用品", "玩具", "文具用品", "運動用品", "其他"];
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

// 帶出刪除頁面選取商品名稱的商品代碼

deleProN.addEventListener("change", function() {
    let body = {
        "product_info": {
            "productName": deleProN.value
        }
    }

    fetch("http://localhost:8080/name_to_id", {
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

        if(checkData.pro_id_list) {
            checkData.pro_id_list.forEach( (i) => {
                const op = document.createElement("option");
                op.value = i;
                op.innerText = i;
                deleProId.appendChild(op);
            })
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出刪除頁面選取的商品名稱(暫時不用)

const deleProId = document.querySelector("#deleProId");
const deleProB = document.querySelector("#deleProBtn");
const proDeleM = document.querySelector("#proDeleModal");

function proDeleCheckAlert() {
    proDeleM.style.display = "flex";
    
}

function closeProDeleCheAlert() {
    proDeleM.style.display = "none";
}

// deleProId.addEventListener("change", function() {
//     let body = {
//         "product_id": deleProId.value
//     }

//     fetch("http://localhost:8080/get_pro_info", {
//         method: "Post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body)
//     })
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(data) {
//         const checkData = JSON.parse(JSON.stringify(data))
//         if(checkData) {
//             deleProN.value = checkData.product_name
//         }
//     })
//     .catch(function(error) {
//         console.log(error)
//     })
// })

// 刪除商品

drawPic();

deleProB.addEventListener("click", function() {

    verify();

    if(verRes === "PASS") {
        let body = {
            "product_info": {
                "productId": deleProId.value,
                "productName": deleProN.value,
                "userId": sessionStorage.getItem("userId")
            }
        }
    
        fetch("http://localhost:8080/dele_product", {
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

            deleProN.value = "";

            const checkData = JSON.parse(JSON.stringify(data));

            if(checkData.message) {
                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";

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
                
                    const seleProN = [revProN, deleProN, chaStaProN];

                    revProN.innerHTML = "";
                    deleProN.innerHTML = "";
                    chaStaProN.innerHTML = "";
                    const rNullOp = document.createElement("option");
                    const dNullOp = document.createElement("option");
                    const cNullOp = document.createElement("option");
                    revProN.appendChild(rNullOp);
                    deleProN.appendChild(dNullOp);
                    chaStaProN.appendChild(cNullOp);
                
                    if(checkData.pro_name_set) {
                        checkData.pro_name_set.forEach(function(i) {
                            seleProN.forEach((proN) => {
                                const op = document.createElement('option');
                                op.value = i;
                                op.innerText = i;
                                proN.appendChild(op);
                            });
                        })
                    }
                })
                .catch(function(error) {
                    console.log(error)
                })
                
                
                setTimeout(() => {
                    mge.innerHTML = "";
                }, 2000);
            }
        })
        .catch(function(error) {
            console.log(error)
        })
    }

})

// 帶出上下架頁面選取商品名稱的商品代碼

chaStaProN.addEventListener("change", function() {
    let body = {
        "product_info": {
            "productName": chaStaProN.value
        }
    }

    fetch("http://localhost:8080/name_to_id", {
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

        if(checkData.pro_id_list) {
            checkData.pro_id_list.forEach( (i) => {
                const op = document.createElement("option");
                op.value = i;
                op.innerText = i;
                CSProId.appendChild(op);
            })
        }
    })
    .catch(function(error) {
        console.log(error)
    })
})

// 帶出上下架商品頁面選取的商品上下架狀態

const CSProId = document.querySelector("#chaStateProId");
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
const pho = document.querySelector("#phone");
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
        pho.value = checkData.member_info.phone
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
            "phone": pho.value,
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

// 停用用戶名

const memDeleM = document.querySelector("#memDeleModal");
const deleMemB = document.querySelector("#deleMemBtn");

function memDeleCheckAlert() {
    memDeleM.style.display = "flex";
    
}

function closeMemDeleCheAlert() {
    memDeleM.style.display = "none";
}

drawPicM();

deleMemB.addEventListener("click", function() {

    verifyM();

    if(verResM === "PASS") {  
        body = {
            "member_info": {
                "userId": sessionStorage.getItem("userId")
            }
        }
    
        fetch("http://localhost:8080/disable_mem_info", {
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
                if(checkData.message === "會員已停用") {
                    setTimeout(function() {
                        sessionStorage.removeItem("userId")
                        alert("跳轉至登入頁面")
                        window.location.href = "../logInPage/logInPage.html"
                    },2000)
                }
                setTimeout(function() {
                    mge.innerHTML = "";
                },2000)
            }
        })
        .catch(function(error) {
            console.log(error)
        })
    }

})