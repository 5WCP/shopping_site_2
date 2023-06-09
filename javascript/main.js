// 未登入無法使用網頁 跳轉登入頁面

if(!sessionStorage.getItem("userId")) {
    alert("請先登入");
    window.location.href = "../logInPage/logInPage.html";
}

// 搜尋種類

const sortsName = ["全部搜尋", "電子", "貴重品", "生活用品", "清潔用品", "寵物用品", "玩具", "文具用品", "運動用品", "其他"];
const searS = document.querySelector("#searSort");

sortsName.forEach((i) => {
    const op = document.createElement("option");
    op.value = i;
    op.innerText = i;
    searS.appendChild(op);
})

// 右上角選單

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

// 登出後跳轉登入頁面

logOut.addEventListener("click", function() {
    sessionStorage.removeItem("userId");
    alert("已登出，進入登入頁面")
    window.location.href = "../logInPage/logInPage.html";
})

// 進入網頁 帶出全部商品資料

const proA = document.querySelector("#proArea");
const mge = document.querySelector("#message");
const totalC = document.querySelector("#totalCount");
const totalP = document.querySelector("#totalPrice");
const checkP = document.querySelector("#checkPrice");
let totC = 0;
let totP = 0;

const user = {
    "userid": sessionStorage.getItem("userId")
}

fetch("http://localhost:8080/sear_all_pro", {
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
    const checkData = JSON.parse(JSON.stringify(data))
    if(checkData.re_pro_list){
        checkData.re_pro_list.forEach((i, index) => {
            const div = document.createElement("div");
            div.classList.add("pro");
            proA.appendChild(div);
    
            const im = document.createElement("img");
            im.src = i.productPicture;
            im.classList.add("proImg")
            div.appendChild(im);
    
            const di = document.createElement("div");
            di.classList.add("info");
            div.appendChild(di);
    
            const id = document.createElement("p");
            id.innerText = "商品代碼 : " + i.productId;
            id.classList.add("proId");
            di.appendChild(id);
    
            const na = document.createElement("p");
            na.innerText = "商品名稱 : " + i.productName;
            na.classList.add("proName");
            di.appendChild(na);
    
            const pr = document.createElement("p");
            pr.innerText = "價格 : " + i.price;
            pr.classList.add("proPrice");
            di.appendChild(pr);
    
            const st = document.createElement("p");
            st.innerText = "庫存 : " + i.stock;
            st.classList.add("proStock");
            di.appendChild(st);
    
            const di2 = document.createElement("div");
            di2.classList.add("addCartArea");
            div.appendChild(di2);
    
            const d = document.createElement("div");
            d.classList.add("countArea");
            di2.appendChild(d);
    
            const dec = document.createElement("button");
            dec.classList.add("countBtn");
            dec.innerText = "◄";
            dec.id = `decrease${index}`;
            d.appendChild(dec);
    
            const count = document.createElement("input");
            count.type = "number";
            count.min = "0";
            count.max = "99";
            count.value = "0";
            count.classList.add("countInput");
            count.id = `${i.productId}Count`;
            count.dataset.value = `${i.productId}`;
            d.appendChild(count);
    
            const inc = document.createElement("button");
            inc.classList.add("countBtn");
            inc.innerText = "►";
            inc.id = `increase${index}`;
            d.appendChild(inc);
    
            const addCartB = document.createElement("button");
            addCartB.id = `add${i.productId}Btn`
            addCartB.classList.add("addCartBtn");
            addCartB.dataset.target = `#${i.productId}Count`
            addCartB.innerText = "加入購物車";
            di2.appendChild(addCartB);
    
            // 新增進購物車數量增減按鈕
    
            const incr = document.querySelector(`#increase${index}`);
            const decr = document.querySelector(`#decrease${index}`);
            const countInput = document.querySelector(`#${i.productId}Count`)
    
            decr.addEventListener("click", () => {
                if(countInput.value > 0) {
                    countInput.value--;
                }
            })
    
            incr.addEventListener("click", () => {
                countInput.value++;
            })

            // 自己的商品無法購買

            if(i.userId === sessionStorage.getItem("userId")) {
                addCartB.disabled = true;
                incr.disabled = true;
                decr.disabled = true;
                countInput.disabled = true;
            }

            // 新增進購物車

            const addCB = document.querySelector(`#add${i.productId}Btn`);
            
            addCB.addEventListener("click", () => {

                if(countInput === "" || countInput < 0) {
                    countInput.value = 0;
                }

                let body = {
                    "order_status": {
                        "userId": sessionStorage.getItem("userId"),
                        "productId": i.productId,
                        "amount": countInput.value
                    }
                }

                fetch("http://localhost:8080/add_in_cart", {
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
                    countInput.value = "0"; 
                    const checkData = JSON.parse(JSON.stringify(data))
                    if(checkData.message) {
                        mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                        setTimeout(() => {
                            mge.innerHTML = "";
                        }, 2000);
                    }

                    // 新增完 帶入購物車資料

                    fetch("http://localhost:8080/user_cart_info", {
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(data) {
                        cartA.innerHTML = "";
                        const cartT = document.createElement("h2");
                        cartT.classList.add("cartTitle");
                        cartT.innerText = "購物車";
                        cartA.appendChild(cartT);
                        const checkData = JSON.parse(JSON.stringify(data));
                        if(checkData.message) {
                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }
                    
                        if(checkData.cart_info_list) {
                            totP = 0;
                            totC = 0;
                            checkData.cart_info_list.forEach((i,index) => {
                                let chaAmount = i.amount;
                                const cartI = document.createElement("div");
                                cartI.classList.add("cartInfo");
                                cartA.appendChild(cartI);
                    
                                const removeC = document.createElement("span");
                                removeC.id = `remove${i.productId}`;
                                removeC.classList.add("removeCart");
                                removeC.innerHTML = "&times;";
                                cartI.appendChild(removeC);
                    
                                const cartProI = document.createElement("img");
                                cartProI.src = i.productPicture;
                                cartProI.classList.add("cartProImg");
                                cartI.appendChild(cartProI);
                    
                                const cartProIn = document.createElement("div");
                                cartProIn.classList.add("cartProInfo");
                                cartI.appendChild(cartProIn);
                    
                                const cartProN = document.createElement("p");
                                cartProN.classList.add("cartProName");
                                cartProN.innerText = "商品名稱 : " + i.productName;
                                cartProIn.appendChild(cartProN);
                    
                                const cartProP = document.createElement("p");
                                cartProP.classList.add("cartProPrice");
                                cartProP.innerText = "價格 : " + i.price;
                                cartProIn.appendChild(cartProP);
                    
                                // const cartProA = document.createElement("p");
                                // cartProA.classList.add("cartProAmount");
                                // cartProA.innerText = "數量 : " + i.amount;
                                // cartProIn.appendChild(cartProA);
                                totP += i.price * i.amount;
                                totalP.innerText = "總價格為 : $" + totP;
                                checkP.innerText = "總價格為 : $" + totP;
                                totC += i.amount;
                                totalC.innerText = "商品總數為 : " + totC; 

                                const decC = document.createElement("button");
                                decC.classList.add("countBtn");
                                decC.innerText = "◄";
                                decC.id = `decrease${index}C`;
                                cartProIn.appendChild(decC);
                        
                                const countC = document.createElement("input");
                                countC.type = "number";
                                countC.min = "0";
                                countC.max = "99";
                                countC.value = "0";
                                countC.value = i.amount;
                                countC.classList.add("countInputC");
                                countC.id = `${i.productId}CountC`;
                                countC.dataset.value = `${i.productId}`;
                                cartProIn.appendChild(countC);
                        
                                const incC = document.createElement("button");
                                incC.classList.add("countBtn");
                                incC.innerText = "►";
                                incC.id = `increase${index}C`;
                                cartProIn.appendChild(incC);
                    
                                // 購物車數量增減按鈕
                        
                                const incrC = document.querySelector(`#increase${index}C`);
                                const decrC = document.querySelector(`#decrease${index}C`);
                                const countInputC = document.querySelector(`#${i.productId}CountC`)
                        
                                // 增減數量存進購物車
                                
                                // 監聽減少數量按鈕
                                decrC.addEventListener("click", () => {
                                    if(countInputC.value > 0) {
                                        countInputC.value--;
                                        totP -= i.price;
                                        totalP.innerText = "總價格為 : $" + totP;
                                        checkP.innerText = "總價格為 : $" + totP;
                                        totC --;
                                        totalC.innerText = "商品總數為 : " + totC;
                                    }
                    
                                    let body = {
                                        "order_status": {
                                            "userId": sessionStorage.getItem("userId"),
                                            "productId": i.productId,
                                            "updateTime": i.updateTime,
                                            "amount": countInputC.value
                                        }
                                    }
                    
                                    fetch("http://localhost:8080/change_cart_amount", {
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
                    
                                            if(checkData.message === "移出購物車") {
                                                cartI.innerHTML = "";
                                                cartI.classList.remove("cartInfo");
                                            }
                    
                                        }
                                    })
                                    .catch(function(error) {
                                        console.log(error)
                                    })
                                
                                })
                        
                                // 監聽增加數量按鈕
                                incrC.addEventListener("click", () => {
                                    if(countInputC.value < i.stock) {
                                        countInputC.value++;
                                        totP += i.price;
                                        totalP.innerText = "總價格為 : $" + totP;
                                        checkP.innerText = "總價格為 : $" + totP;
                                        totC ++;
                                        totalC.innerText = "商品總數為 : " + totC;
                                    }
                    
                                    let body = {
                                        "order_status": {
                                            "userId": sessionStorage.getItem("userId"),
                                            "productId": i.productId,
                                            "updateTime": i.updateTime,
                                            "amount": countInputC.value
                                        }
                                    }
                    
                                    fetch("http://localhost:8080/change_cart_amount", {
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
                    
                                // 監聽input框
                                countInputC.addEventListener("change", () => {
                    
                                    if(countInputC.value === "" || countInputC.value < 0) {
                                        countInputC.value = chaAmount;
                                    }
                    
                                    let body = {
                                        "order_status": {
                                            "userId": sessionStorage.getItem("userId"),
                                            "productId": i.productId,
                                            "updateTime": i.updateTime,
                                            "amount": countInputC.value
                                        }
                                    }
                    
                                    fetch("http://localhost:8080/change_cart_amount", {
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
                                            
                                            if(overSto.test(checkData.message)) {
                                                countInputC.value = i.stock;
                                            }
                    
                                            if(checkData.message === "移出購物車") {
                                                cartI.innerHTML = "";
                                                cartI.classList.remove("cartInfo");
                                            }
                                        }
                    
                                        totP += i.price * (countInputC.value - chaAmount);
                                        totalP.innerText = "總價格為 : $" + totP;
                                        checkP.innerText = "總價格為 : $" + totP;
                                        totC += +(countInputC.value - chaAmount);
                                        totalC.innerText = "商品總數為 : " + totC;
                                        chaAmount = countInputC.value;
                    
                                    })
                                    .catch(function(error) {
                                        console.log(error)
                                    })
                                })

                                // 刪除購物車的商品
                    
                                const removeProB = document.querySelector(`#remove${i.productId}`);
                    
                                removeProB.addEventListener("click", () => {
                                    
                                    let body = {
                                        "order_status": {
                                            "userId": sessionStorage.getItem("userId"),
                                            "productId": i.productId,
                                            "updateTime": i.updateTime
                                        }
                                    }
                    
                                    fetch("http://localhost:8080/remove_pro_from_cart", {
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
                                        if(checkData) {
                                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                            setTimeout(() => {
                                                mge.innerHTML = "";
                                            }, 2000);
                                        }
                                        cartI.innerHTML = "";
                                        cartI.classList.remove("cartInfo")
                                        totP -= i.price * i.amount;
                                        totalP.innerText = "總價格為 : $" + totP;
                                        checkP.innerText = "總價格為 : $" + totP;
                                        totC -= i.amount;
                                        totalC.innerText = "商品總數為 : " + totC; 
                                    })
                                    .catch(function(error) {
                                        console.log(error)
                                    })
                                })
                    
                            })
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    })

                })
                .catch(function(error) {
                    console.log(error)
                })
            })
        })
    }
})
.catch(function(error) {
    console.log(error)
})

// 帶出購物車資料

const cartA = document.querySelector("#cartArea");
const overSto = /該商品最多可輸入的數量為/;

fetch("http://localhost:8080/user_cart_info", {
    method: "Post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
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

    if(checkData.cart_info_list) {
        checkData.cart_info_list.forEach((i,index) => {
            let chaAmount = i.amount;
            const cartI = document.createElement("div");
            cartI.classList.add("cartInfo");
            cartA.appendChild(cartI);

            const removeC = document.createElement("span");
            removeC.id = `remove${i.productId}`;
            removeC.classList.add("removeCart");
            removeC.innerHTML = "&times;";
            cartI.appendChild(removeC);

            const cartProI = document.createElement("img");
            cartProI.src = i.productPicture;
            cartProI.classList.add("cartProImg");
            cartI.appendChild(cartProI);

            const cartProIn = document.createElement("div");
            cartProIn.classList.add("cartProInfo");
            cartI.appendChild(cartProIn);

            const cartProN = document.createElement("p");
            cartProN.classList.add("cartProName");
            cartProN.innerText = "商品名稱 : " + i.productName;
            cartProIn.appendChild(cartProN);

            const cartProP = document.createElement("p");
            cartProP.classList.add("cartProPrice");
            cartProP.innerText = "價格 : " + i.price;
            cartProIn.appendChild(cartProP);

            // const cartProA = document.createElement("p");
            // cartProA.classList.add("cartProAmount");
            // cartProA.innerText = "數量 : " + i.amount;
            // cartProIn.appendChild(cartProA);
            totP += i.price * i.amount;
            totalP.innerText = "總價格為 : $" + totP;
            checkP.innerText = "總價格為 : $" + totP;
            totC += i.amount;
            totalC.innerText = "商品總數為 : " + totC;

            const decC = document.createElement("button");
            decC.classList.add("countBtn");
            decC.innerText = "◄";
            decC.id = `decrease${index}C`;
            cartProIn.appendChild(decC);
    
            const countC = document.createElement("input");
            countC.type = "number";
            countC.min = "0";
            countC.max = "99";
            countC.value = "0";
            countC.value = i.amount;
            countC.classList.add("countInputC");
            countC.id = `${i.productId}CountC`;
            countC.dataset.value = `${i.productId}`;
            cartProIn.appendChild(countC);
    
            const incC = document.createElement("button");
            incC.classList.add("countBtn");
            incC.innerText = "►";
            incC.id = `increase${index}C`;
            cartProIn.appendChild(incC);

            // 購物車數量增減按鈕
    
            const incrC = document.querySelector(`#increase${index}C`);
            const decrC = document.querySelector(`#decrease${index}C`);
            const countInputC = document.querySelector(`#${i.productId}CountC`)
    
            // 增減數量存進購物車
            
            // 監聽減少數量按鈕
            decrC.addEventListener("click", () => {
                if(countInputC.value > 0) {
                    countInputC.value--;
                    totP -= i.price;
                    totalP.innerText = "總價格為 : $" + totP;
                    checkP.innerText = "總價格為 : $" + totP;
                    totC --;
                    totalC.innerText = "商品總數為 : " + totC;
                }

                let body = {
                    "order_status": {
                        "userId": sessionStorage.getItem("userId"),
                        "productId": i.productId,
                        "updateTime": i.updateTime,
                        "amount": countInputC.value
                    }
                }

                fetch("http://localhost:8080/change_cart_amount", {
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

                        if(checkData.message === "移出購物車") {
                            cartI.innerHTML = "";
                            cartI.classList.remove("cartInfo");
                        }

                    }
                })
                .catch(function(error) {
                    console.log(error)
                })
            
            })
    
            // 監聽增加數量按鈕
            incrC.addEventListener("click", () => {
                if(countInputC.value < i.stock) {
                    countInputC.value++;
                    totP += i.price;
                    totalP.innerText = "總價格為 : $" + totP;
                    checkP.innerText = "總價格為 : $" + totP;
                    totC ++;
                    totalC.innerText = "商品總數為 : " + totC;
                }

                let body = {
                    "order_status": {
                        "userId": sessionStorage.getItem("userId"),
                        "productId": i.productId,
                        "updateTime": i.updateTime,
                        "amount": countInputC.value
                    }
                }

                fetch("http://localhost:8080/change_cart_amount", {
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

            // 監聽input框
            countInputC.addEventListener("change", () => {

                if(countInputC.value === "" || countInputC.value < 0) {
                    countInputC.value = chaAmount;
                }

                let body = {
                    "order_status": {
                        "userId": sessionStorage.getItem("userId"),
                        "productId": i.productId,
                        "updateTime": i.updateTime,
                        "amount": countInputC.value
                    }
                }

                fetch("http://localhost:8080/change_cart_amount", {
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
                        
                        if(overSto.test(checkData.message)) {
                            countInputC.value = i.stock;
                        }

                        if(checkData.message === "移出購物車") {
                            cartI.innerHTML = "";
                            cartI.classList.remove("cartInfo");
                        }
                    }

                    totP += i.price * (countInputC.value - chaAmount);
                    totalP.innerText = "總價格為 : $" + totP;
                    checkP.innerText = "總價格為 : $" + totP;
                    totC += +(countInputC.value - chaAmount);
                    totalC.innerText = "商品總數為 : " + totC;
                    chaAmount = countInputC.value;

                })
                .catch(function(error) {
                    console.log(error)
                })
            })

            // 刪除購物車的商品

            const removePro = document.querySelector(`#remove${i.productId}`);

            removePro.addEventListener("click", () => {
                
                let body = {
                    "order_status": {
                        "userId": sessionStorage.getItem("userId"),
                        "productId": i.productId,
                        "updateTime": i.updateTime
                    }
                }

                fetch("http://localhost:8080/remove_pro_from_cart", {
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
                        mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                        setTimeout(() => {
                            mge.innerHTML = "";
                        }, 2000);
                    }
                    cartI.innerHTML = "";
                    cartI.classList.remove("cartInfo");
                    totP -= i.price * i.amount;
                    totalP.innerText = "總價格為 : $" + totP;
                    checkP.innerText = "總價格為 : $" + totP;
                    totC -= i.amount;
                    totalC.innerText = "商品總數為 : " + totC; 
                })
                .catch(function(error) {
                    console.log(error)
                })
            })

        })
    }
})
.catch(function(error) {
    console.log(error)
})

// 更換分類

searS.addEventListener("change", () => {
    proA.innerHTML = "";
    let body = {
        "userid": sessionStorage.getItem("userId"),
        "sort_name": searS.value
    }

    fetch("http://localhost:8080/sear_pro_sort", {
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
        if(checkData.re_pro_list) {
            checkData.re_pro_list.forEach((i, index) => {
                const div = document.createElement("div");
                div.classList.add("pro");
                proA.appendChild(div);
    
                const im = document.createElement("img");
                im.src = i.productPicture;
                im.classList.add("proImg")
                div.appendChild(im);
    
                const di = document.createElement("div");
                di.classList.add("info");
                div.appendChild(di);
    
                const id = document.createElement("p");
                id.innerText = "商品代碼 : " + i.productId;
                id.classList.add("proId");
                di.appendChild(id);
    
                const na = document.createElement("p");
                na.innerText = "商品名稱 : " + i.productName;
                na.classList.add("proName");
                di.appendChild(na);
    
                const pr = document.createElement("p");
                pr.innerText = "價格 : " + i.price;
                pr.classList.add("proPrice");
                di.appendChild(pr);
    
                const st = document.createElement("p");
                st.innerText = "庫存 : " + i.stock;
                st.classList.add("proStock");
                di.appendChild(st);
    
                const di2 = document.createElement("div");
                di2.classList.add("addCartArea");
                div.appendChild(di2);
    
                const d = document.createElement("div");
                d.classList.add("countArea");
                di2.appendChild(d);
    
                const dec = document.createElement("button");
                dec.classList.add("countBtn");
                dec.innerText = "◄";
                dec.id = `decrease${index}`;
                d.appendChild(dec);
    
                const count = document.createElement("input");
                count.type = "number";
                count.min = "0";
                count.max = "99";
                count.value = "0";
                count.classList.add("countInput");
                count.id = `${i.productId}Count`;
                count.dataset.value = `${i.productId}`;
                d.appendChild(count);
    
                const inc = document.createElement("button");
                inc.classList.add("countBtn");
                inc.innerText = "►";
                inc.id = `increase${index}`;
                d.appendChild(inc);
    
                const addCartB = document.createElement("button");
                addCartB.id = `add${i.productId}Btn`
                addCartB.classList.add("addCartBtn");
                addCartB.dataset.target = `#${i.productId}Count`
                addCartB.innerText = "加入購物車";
                di2.appendChild(addCartB);
    
                // 新增進購物車數量增減按鈕
    
                const incr = document.querySelector(`#increase${index}`);
                const decr = document.querySelector(`#decrease${index}`);
                const countInput = document.querySelector(`#${i.productId}Count`)
    
                decr.addEventListener("click", () => {
                    if(countInput.value > 0) {
                        countInput.value--;
                    }
                })
    
                incr.addEventListener("click", () => {
                    countInput.value++;
                })

                // 自己的商品無法購買

                if(i.userId === sessionStorage.getItem("userId")) {
                    addCartB.disabled = true;
                    incr.disabled = true;
                    decr.disabled = true;
                    countInput.disabled = true;
                }
    
                // 新增進購物車
    
                const addCB = document.querySelector(`#add${i.productId}Btn`);
                
                addCB.addEventListener("click", () => {
                    let body = {
                        "order_status": {
                            "userId": sessionStorage.getItem("userId"),
                            "productId": i.productId,
                            "amount": countInput.value
                        }
                    }
    
                    fetch("http://localhost:8080/add_in_cart", {
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
                        countInput.value = "0";
                        const checkData = JSON.parse(JSON.stringify(data))
                        if(checkData.message) {
                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }

                        // 新增完 帶入購物車資料

                        fetch("http://localhost:8080/user_cart_info", {
                            method: "Post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(data) {
                            cartA.innerHTML = "";
                            const cartT = document.createElement("h2");
                            cartT.classList.add("cartTitle");
                            cartT.innerText = "購物車";
                            cartA.appendChild(cartT);
                            const checkData = JSON.parse(JSON.stringify(data));
                            if(checkData.message) {
                                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                setTimeout(() => {
                                    mge.innerHTML = "";
                                }, 2000);
                            }
                        
                            if(checkData.cart_info_list) {
                                totP = 0;
                                totC = 0;
                                checkData.cart_info_list.forEach((i,index) => {
                                    let chaAmount = i.amount;
                                    const cartI = document.createElement("div");
                                    cartI.classList.add("cartInfo");
                                    cartA.appendChild(cartI);
                        
                                    const removeC = document.createElement("span");
                                    removeC.id = `remove${i.productId}`;
                                    removeC.classList.add("removeCart");
                                    removeC.innerHTML = "&times;";
                                    cartI.appendChild(removeC);
                        
                                    const cartProI = document.createElement("img");
                                    cartProI.src = i.productPicture;
                                    cartProI.classList.add("cartProImg");
                                    cartI.appendChild(cartProI);
                        
                                    const cartProIn = document.createElement("div");
                                    cartProIn.classList.add("cartProInfo");
                                    cartI.appendChild(cartProIn);
                        
                                    const cartProN = document.createElement("p");
                                    cartProN.classList.add("cartProName");
                                    cartProN.innerText = "商品名稱 : " + i.productName;
                                    cartProIn.appendChild(cartProN);
                        
                                    const cartProP = document.createElement("p");
                                    cartProP.classList.add("cartProPrice");
                                    cartProP.innerText = "價格 : " + i.price;
                                    cartProIn.appendChild(cartProP);
                        
                                    // const cartProA = document.createElement("p");
                                    // cartProA.classList.add("cartProAmount");
                                    // cartProA.innerText = "數量 : " + i.amount;
                                    // cartProIn.appendChild(cartProA);
                                    totP += i.price * i.amount;
                                    totalP.innerText = "總價格為 : $" + totP;
                                    checkP.innerText = "總價格為 : $" + totP;
                                    totC += i.amount;
                                    totalC.innerText = "商品總數為 : " + totC;

                                    const decC = document.createElement("button");
                                    decC.classList.add("countBtn");
                                    decC.innerText = "◄";
                                    decC.id = `decrease${index}C`;
                                    cartProIn.appendChild(decC);
                            
                                    const countC = document.createElement("input");
                                    countC.type = "number";
                                    countC.min = "0";
                                    countC.max = "99";
                                    countC.value = "0";
                                    countC.value = i.amount;
                                    countC.classList.add("countInputC");
                                    countC.id = `${i.productId}CountC`;
                                    countC.dataset.value = `${i.productId}`;
                                    cartProIn.appendChild(countC);
                            
                                    const incC = document.createElement("button");
                                    incC.classList.add("countBtn");
                                    incC.innerText = "►";
                                    incC.id = `increase${index}C`;
                                    cartProIn.appendChild(incC);
                        
                                    // 購物車數量增減按鈕
                            
                                    const incrC = document.querySelector(`#increase${index}C`);
                                    const decrC = document.querySelector(`#decrease${index}C`);
                                    const countInputC = document.querySelector(`#${i.productId}CountC`)
                            
                                    // 增減數量存進購物車
                                    
                                    // 監聽減少數量按鈕
                                    decrC.addEventListener("click", () => {
                                        if(countInputC.value > 0) {
                                            countInputC.value--;
                                            totP -= i.price;
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC --;
                                            totalC.innerText = "商品總數為 : " + totC;
                                        }
                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime,
                                                "amount": countInputC.value
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/change_cart_amount", {
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
                        
                                                if(checkData.message === "移出購物車") {
                                                    cartI.innerHTML = "";
                                                    cartI.classList.remove("cartInfo");
                                                }
                        
                                            }
                                        })
                                        .catch(function(error) {
                                            console.log(error)
                                        })
                                    
                                    })
                            
                                    // 監聽增加數量按鈕
                                    incrC.addEventListener("click", () => {
                                        if(countInputC.value < i.stock) {
                                            countInputC.value++;
                                            totP += i.price;
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC ++;
                                            totalC.innerText = "商品總數為 : " + totC;
                                        }
                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime,
                                                "amount": countInputC.value
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/change_cart_amount", {
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
                        
                                    // 監聽input框
                                    countInputC.addEventListener("change", () => {
                        
                                        if(countInputC.value === "" || countInputC.value < 0) {
                                            countInputC.value = chaAmount;
                                        }
                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime,
                                                "amount": countInputC.value
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/change_cart_amount", {
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
                                                
                                                if(overSto.test(checkData.message)) {
                                                    countInputC.value = i.stock;
                                                }
                        
                                                if(checkData.message === "移出購物車") {
                                                    cartI.innerHTML = "";
                                                    cartI.classList.remove("cartInfo");
                                                }
                                            }
                        
                                            totP += i.price * (countInputC.value - chaAmount);
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC += +(countInputC.value - chaAmount);
                                            totalC.innerText = "商品總數為 : " + totC;
                                            chaAmount = countInputC.value;
                        
                                        })
                                        .catch(function(error) {
                                            console.log(error)
                                        })
                                    })
                        
                                    // 刪除購物車的商品
                        
                                    const removeProB = document.querySelector(`#remove${i.productId}`);
                        
                                    removeProB.addEventListener("click", () => {
                                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/remove_pro_from_cart", {
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
                                            if(checkData) {
                                                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                                setTimeout(() => {
                                                    mge.innerHTML = "";
                                                }, 2000);
                                            }
                                            cartI.innerHTML = "";
                                            cartI.classList.remove("cartInfo");
                                            totP -= i.price * i.amount;
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC -= i.amount;
                                            totalC.innerText = "商品總數為 : " + totC; 
                                        })
                                        .catch(function(error) {
                                            console.log(error)
                                        })
                                    })
                        
                                })
                            }
                        })
                        .catch(function(error) {
                            console.log(error)
                        })

                    })
                    .catch(function(error) {
                        console.log(error)
                    })
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
})

// 搜尋名稱+分類

const searProB= document.querySelector("#searProBtn");
const searI= document.querySelector("#searInp");

searProB.addEventListener("click", () => {

    proA.innerHTML = "";

    let body = {
        "product_info": {
            "productName": searI.value
        },
        "sort_name": searS.value
    }

    fetch("http://localhost:8080/sear_pro_name_and_sort", {
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

        if(checkData.re_pro_list) {
            checkData.re_pro_list.forEach((i, index) => {
                const div = document.createElement("div");
                div.classList.add("pro");
                proA.appendChild(div);
    
                const im = document.createElement("img");
                im.src = i.productPicture;
                im.classList.add("proImg")
                div.appendChild(im);
    
                const di = document.createElement("div");
                di.classList.add("info");
                div.appendChild(di);
    
                const id = document.createElement("p");
                id.innerText = "商品代碼 : " + i.productId;
                id.classList.add("proId");
                di.appendChild(id);
    
                const na = document.createElement("p");
                na.innerText = "商品名稱 : " + i.productName;
                na.classList.add("proName");
                di.appendChild(na);
    
                const pr = document.createElement("p");
                pr.innerText = "價格 : " + i.price;
                pr.classList.add("proPrice");
                di.appendChild(pr);
    
                const st = document.createElement("p");
                st.innerText = "庫存 : " + i.stock;
                st.classList.add("proStock");
                di.appendChild(st);
    
                const di2 = document.createElement("div");
                di2.classList.add("addCartArea");
                div.appendChild(di2);
    
                const d = document.createElement("div");
                d.classList.add("countArea");
                di2.appendChild(d);
    
                const dec = document.createElement("button");
                dec.classList.add("countBtn");
                dec.innerText = "◄";
                dec.id = `decrease${index}`;
                d.appendChild(dec);
    
                const count = document.createElement("input");
                count.type = "number";
                count.min = "0";
                count.max = "99";
                count.value = "0";
                count.classList.add("countInput");
                count.id = `${i.productId}Count`;
                count.dataset.value = `${i.productId}`;
                d.appendChild(count);
    
                const inc = document.createElement("button");
                inc.classList.add("countBtn");
                inc.innerText = "►";
                inc.id = `increase${index}`;
                d.appendChild(inc);
    
                const addCartB = document.createElement("button");
                addCartB.id = `add${i.productId}Btn`
                addCartB.classList.add("addCartBtn");
                addCartB.dataset.target = `#${i.productId}Count`
                addCartB.innerText = "加入購物車";
                di2.appendChild(addCartB);
    
                // 購物車數量增減按鈕
    
                const incr = document.querySelector(`#increase${index}`);
                const decr = document.querySelector(`#decrease${index}`);
                const countInput = document.querySelector(`#${i.productId}Count`)
    
                decr.addEventListener("click", () => {
                    if(countInput.value > 0) {
                        countInput.value--;
                    }
                })
    
                incr.addEventListener("click", () => {
                    countInput.value++;
                })

                // 自己的商品無法購買

                if(i.userId === sessionStorage.getItem("userId")) {
                    addCartB.disabled = true;
                    incr.disabled = true;
                    decr.disabled = true;
                    countInput.disabled = true;
                }
    
                // 新增進購物車
    
                const addCB = document.querySelector(`#add${i.productId}Btn`);
                
                addCB.addEventListener("click", () => {
                    let body = {
                        "order_status": {
                            "userId": sessionStorage.getItem("userId"),
                            "productId": i.productId,
                            "amount": countInput.value
                        }
                    }
    
                    fetch("http://localhost:8080/add_in_cart", {
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
                        countInput.value = "0";
                        const checkData = JSON.parse(JSON.stringify(data))
                        if(checkData.message) {
                            mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                            setTimeout(() => {
                                mge.innerHTML = "";
                            }, 2000);
                        }

                        // 新增完 帶入購物車資料

                        fetch("http://localhost:8080/user_cart_info", {
                            method: "Post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(data) {
                            cartA.innerHTML = "";
                            const cartT = document.createElement("h2");
                            cartT.classList.add("cartTitle");
                            cartT.innerText = "購物車";
                            cartA.appendChild(cartT);
                            const checkData = JSON.parse(JSON.stringify(data));
                            if(checkData.message) {
                                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                setTimeout(() => {
                                    mge.innerHTML = "";
                                }, 2000);
                            }
                        
                            if(checkData.cart_info_list) {
                                totP = 0;
                                totC = 0;
                                checkData.cart_info_list.forEach((i,index) => {
                                    let chaAmount = i.amount;
                                    const cartI = document.createElement("div");
                                    cartI.classList.add("cartInfo");
                                    cartA.appendChild(cartI);
                        
                                    const removeC = document.createElement("span");
                                    removeC.id = `remove${i.productId}`;
                                    removeC.classList.add("removeCart");
                                    removeC.innerHTML = "&times;";
                                    cartI.appendChild(removeC);
                        
                                    const cartProI = document.createElement("img");
                                    cartProI.src = i.productPicture;
                                    cartProI.classList.add("cartProImg");
                                    cartI.appendChild(cartProI);
                        
                                    const cartProIn = document.createElement("div");
                                    cartProIn.classList.add("cartProInfo");
                                    cartI.appendChild(cartProIn);
                        
                                    const cartProN = document.createElement("p");
                                    cartProN.classList.add("cartProName");
                                    cartProN.innerText = "商品名稱 : " + i.productName;
                                    cartProIn.appendChild(cartProN);
                        
                                    const cartProP = document.createElement("p");
                                    cartProP.classList.add("cartProPrice");
                                    cartProP.innerText = "價格 : " + i.price;
                                    cartProIn.appendChild(cartProP);
                        
                                    // const cartProA = document.createElement("p");
                                    // cartProA.classList.add("cartProAmount");
                                    // cartProA.innerText = "數量 : " + i.amount;
                                    // cartProIn.appendChild(cartProA);
                                    totP += i.price * i.amount;
                                    totalP.innerText = "總價格為 : $" + totP;
                                    checkP.innerText = "總價格為 : $" + totP;
                                    totC += i.amount;
                                    totalC.innerText = "商品總數為 : " + totC;

                                    const decC = document.createElement("button");
                                    decC.classList.add("countBtn");
                                    decC.innerText = "◄";
                                    decC.id = `decrease${index}C`;
                                    cartProIn.appendChild(decC);
                            
                                    const countC = document.createElement("input");
                                    countC.type = "number";
                                    countC.min = "0";
                                    countC.max = "99";
                                    countC.value = "0";
                                    countC.value = i.amount;
                                    countC.classList.add("countInputC");
                                    countC.id = `${i.productId}CountC`;
                                    countC.dataset.value = `${i.productId}`;
                                    cartProIn.appendChild(countC);
                            
                                    const incC = document.createElement("button");
                                    incC.classList.add("countBtn");
                                    incC.innerText = "►";
                                    incC.id = `increase${index}C`;
                                    cartProIn.appendChild(incC);
                        
                                    // 購物車數量增減按鈕
                            
                                    const incrC = document.querySelector(`#increase${index}C`);
                                    const decrC = document.querySelector(`#decrease${index}C`);
                                    const countInputC = document.querySelector(`#${i.productId}CountC`)
                            
                                    // 增減數量存進購物車
                                    
                                    // 監聽減少數量按鈕
                                    decrC.addEventListener("click", () => {
                                        if(countInputC.value > 0) {
                                            countInputC.value--;
                                            totP -= i.price;
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC --;
                                            totalC.innerText = "商品總數為 : " + totC;
                                        }
                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime,
                                                "amount": countInputC.value
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/change_cart_amount", {
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
                        
                                                if(checkData.message === "移出購物車") {
                                                    cartI.innerHTML = "";
                                                    cartI.classList.remove("cartInfo");
                                                }
                        
                                            }
                                        })
                                        .catch(function(error) {
                                            console.log(error)
                                        })
                                    
                                    })
                            
                                    // 監聽增加數量按鈕
                                    incrC.addEventListener("click", () => {
                                        if(countInputC.value < i.stock) {
                                            countInputC.value++;
                                            totP += i.price;
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC ++;
                                            totalC.innerText = "商品總數為 : " + totC;
                                        }
                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime,
                                                "amount": countInputC.value
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/change_cart_amount", {
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
                        
                                    // 監聽input框
                                    countInputC.addEventListener("change", () => {
                        
                                        if(countInputC.value === "" || countInputC.value < 0) {
                                            countInputC.value = chaAmount;
                                        }
                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime,
                                                "amount": countInputC.value
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/change_cart_amount", {
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
                                                
                                                if(overSto.test(checkData.message)) {
                                                    countInputC.value = i.stock;
                                                }
                        
                                                if(checkData.message === "移出購物車") {
                                                    cartI.innerHTML = "";
                                                    cartI.classList.remove("cartInfo");
                                                }
                                            }
                        
                                            totP += i.price * (countInputC.value - chaAmount);
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC += +(countInputC.value - chaAmount);
                                            totalC.innerText = "商品總數為 : " + totC;
                                            chaAmount = countInputC.value;
                        
                                        })
                                        .catch(function(error) {
                                            console.log(error)
                                        })
                                    })
                        
                                    // 刪除購物車的商品
                        
                                    const removeProB = document.querySelector(`#remove${i.productId}`);
                        
                                    removeProB.addEventListener("click", () => {
                                        
                                        let body = {
                                            "order_status": {
                                                "userId": sessionStorage.getItem("userId"),
                                                "productId": i.productId,
                                                "updateTime": i.updateTime
                                            }
                                        }
                        
                                        fetch("http://localhost:8080/remove_pro_from_cart", {
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
                                            if(checkData) {
                                                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                                setTimeout(() => {
                                                    mge.innerHTML = "";
                                                }, 2000);
                                            }
                                            cartI.innerHTML = "";
                                            cartI.classList.remove("cartInfo");
                                            totP -= i.price * i.amount;
                                            totalP.innerText = "總價格為 : $" + totP;
                                            checkP.innerText = "總價格為 : $" + totP;
                                            totC -= i.amount;
                                            totalC.innerText = "商品總數為 : " + totC; 
                                        })
                                        .catch(function(error) {
                                            console.log(error)
                                        })
                                    })
                        
                                })
                            }
                        })
                        .catch(function(error) {
                            console.log(error)
                        })

                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                })
            })
        }
        
    })
})

// 台灣各縣市

const addC = document.querySelector("#addressC");
const cityList = ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市", "新竹縣", "苗栗縣", "彰化縣", "南投縣", 
"雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣", "基隆市", "新竹市", "嘉義市"];

    cityList.forEach((i) => {
        const op = document.createElement("option");
        op.innerText = i;
        op.value = i;
        addC.appendChild(op);
    })

// 確認購買彈出視窗含式

const checkI = document.querySelector("#checkInfo");

function openCheckAlert() {
    checkI.style.display = "flex";
}

function closeCheckAlert() {
    checkI.style.display = "none";
}

// 下訂單

const add = document.querySelector("#address");
const checkoutB = document.querySelector("#checkoutBtn");

checkoutB.addEventListener("click", () => {


    let body = {
        "userid": sessionStorage.getItem("userId"),
        "address": addC.value + add.value
    }

    fetch("http://localhost:8080/check_out", {
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
        
        totalP.innerText = "總價格為 : $";
        checkP.innerText = "總價格為 : $";
        totalC.innerText = "商品總數為 : ";

        // 下單完網頁刷新為全部搜尋

        searS.value = "全部搜尋";
        
        fetch("http://localhost:8080/sear_all_pro", {
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
            proA.innerHTML = "";
            cartA.innerHTML = "";
            const cartT = document.createElement("h2");
            cartT.classList.add("cartTitle");
            cartT.innerText = "購物車";
            cartA.appendChild(cartT);
            const checkData = JSON.parse(JSON.stringify(data))
            if(checkData.re_pro_list){
                checkData.re_pro_list.forEach((i, index) => {
                    const div = document.createElement("div");
                    div.classList.add("pro");
                    proA.appendChild(div);
            
                    const im = document.createElement("img");
                    im.src = i.productPicture;
                    im.classList.add("proImg")
                    div.appendChild(im);
            
                    const di = document.createElement("div");
                    di.classList.add("info");
                    div.appendChild(di);
            
                    const id = document.createElement("p");
                    id.innerText = "商品代碼 : " + i.productId;
                    id.classList.add("proId");
                    di.appendChild(id);
            
                    const na = document.createElement("p");
                    na.innerText = "商品名稱 : " + i.productName;
                    na.classList.add("proName");
                    di.appendChild(na);
            
                    const pr = document.createElement("p");
                    pr.innerText = "價格 : " + i.price;
                    pr.classList.add("proPrice");
                    di.appendChild(pr);
            
                    const st = document.createElement("p");
                    st.innerText = "庫存 : " + i.stock;
                    st.classList.add("proStock");
                    di.appendChild(st);
            
                    const di2 = document.createElement("div");
                    di2.classList.add("addCartArea");
                    div.appendChild(di2);
            
                    const d = document.createElement("div");
                    d.classList.add("countArea");
                    di2.appendChild(d);
            
                    const dec = document.createElement("button");
                    dec.classList.add("countBtn");
                    dec.innerText = "◄";
                    dec.id = `decrease${index}`;
                    d.appendChild(dec);
            
                    const count = document.createElement("input");
                    count.type = "number";
                    count.min = "0";
                    count.max = "99";
                    count.value = "0";
                    count.classList.add("countInput");
                    count.id = `${i.productId}Count`;
                    count.dataset.value = `${i.productId}`;
                    d.appendChild(count);
            
                    const inc = document.createElement("button");
                    inc.classList.add("countBtn");
                    inc.innerText = "►";
                    inc.id = `increase${index}`;
                    d.appendChild(inc);
            
                    const addCartB = document.createElement("button");
                    addCartB.id = `add${i.productId}Btn`
                    addCartB.classList.add("addCartBtn");
                    addCartB.dataset.target = `#${i.productId}Count`
                    addCartB.innerText = "加入購物車";
                    di2.appendChild(addCartB);
            
                    // 購物車數量增減按鈕
            
                    const incr = document.querySelector(`#increase${index}`);
                    const decr = document.querySelector(`#decrease${index}`);
                    const countInput = document.querySelector(`#${i.productId}Count`)
            
                    decr.addEventListener("click", () => {
                        if(countInput.value > 0) {
                            countInput.value--;
                        }
                    })
            
                    incr.addEventListener("click", () => {
                        countInput.value++;
                    })

                    // 自己的商品無法購買

                    if(i.userId === sessionStorage.getItem("userId")) {
                        addCartB.disabled = true;
                        incr.disabled = true;
                        decr.disabled = true;
                        countInput.disabled = true;
                    }
        
                    // 新增進購物車
        
                    const addCB = document.querySelector(`#add${i.productId}Btn`);
                    
                    addCB.addEventListener("click", () => {
                        let body = {
                            "order_status": {
                                "userId": sessionStorage.getItem("userId"),
                                "productId": i.productId,
                                "amount": countInput.value
                            }
                        }
        
                        fetch("http://localhost:8080/add_in_cart", {
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
                            countInput.value = "0"; 
                            const checkData = JSON.parse(JSON.stringify(data))
                            if(checkData.message) {
                                mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                setTimeout(() => {
                                    mge.innerHTML = "";
                                }, 2000);
                            }
        
                            // 新增完 帶入購物車資料
        
                            fetch("http://localhost:8080/user_cart_info", {
                                method: "Post",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(user)
                            })
                            .then(function(response) {
                                return response.json()
                            })
                            .then(function(data) {
                                cartA.innerHTML = "";
                                const cartT = document.createElement("h2");
                                cartT.classList.add("cartTitle");
                                cartT.innerText = "購物車";
                                cartA.appendChild(cartT);
                                const checkData = JSON.parse(JSON.stringify(data));
                                if(checkData.message) {
                                    mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                    setTimeout(() => {
                                        mge.innerHTML = "";
                                    }, 2000);
                                }
                            
                                if(checkData.cart_info_list) {
                                    totP = 0;
                                    totC = 0;
                                    checkData.cart_info_list.forEach((i,index) => {
                                        let chaAmount = i.amount;
                                        const cartI = document.createElement("div");
                                        cartI.classList.add("cartInfo");
                                        cartA.appendChild(cartI);
                            
                                        const removeC = document.createElement("span");
                                        removeC.id = `remove${i.productId}`;
                                        removeC.classList.add("removeCart");
                                        removeC.innerHTML = "&times;";
                                        cartI.appendChild(removeC);
                            
                                        const cartProI = document.createElement("img");
                                        cartProI.src = i.productPicture;
                                        cartProI.classList.add("cartProImg");
                                        cartI.appendChild(cartProI);
                            
                                        const cartProIn = document.createElement("div");
                                        cartProIn.classList.add("cartProInfo");
                                        cartI.appendChild(cartProIn);
                            
                                        const cartProN = document.createElement("p");
                                        cartProN.classList.add("cartProName");
                                        cartProN.innerText = "商品名稱 : " + i.productName;
                                        cartProIn.appendChild(cartProN);
                            
                                        const cartProP = document.createElement("p");
                                        cartProP.classList.add("cartProPrice");
                                        cartProP.innerText = "價格 : " + i.price;
                                        cartProIn.appendChild(cartProP);
                            
                                        // const cartProA = document.createElement("p");
                                        // cartProA.classList.add("cartProAmount");
                                        // cartProA.innerText = "數量 : " + i.amount;
                                        // cartProIn.appendChild(cartProA);
                                        totP += i.price * i.amount;
                                        totalP.innerText = "總價格為 : $" + totP;
                                        checkP.innerText = "總價格為 : $" + totP;
                                        totC += i.amount;
                                        totalC.innerText = "商品總數為 : " + totC;

                                        const decC = document.createElement("button");
                                        decC.classList.add("countBtn");
                                        decC.innerText = "◄";
                                        decC.id = `decrease${index}C`;
                                        cartProIn.appendChild(decC);
                                
                                        const countC = document.createElement("input");
                                        countC.type = "number";
                                        countC.min = "0";
                                        countC.max = "99";
                                        countC.value = "0";
                                        countC.value = i.amount;
                                        countC.classList.add("countInputC");
                                        countC.id = `${i.productId}CountC`;
                                        countC.dataset.value = `${i.productId}`;
                                        cartProIn.appendChild(countC);
                                
                                        const incC = document.createElement("button");
                                        incC.classList.add("countBtn");
                                        incC.innerText = "►";
                                        incC.id = `increase${index}C`;
                                        cartProIn.appendChild(incC);
                            
                                        // 購物車數量增減按鈕
                                
                                        const incrC = document.querySelector(`#increase${index}C`);
                                        const decrC = document.querySelector(`#decrease${index}C`);
                                        const countInputC = document.querySelector(`#${i.productId}CountC`)
                                
                                        // 增減數量存進購物車
                                        
                                        // 監聽減少數量按鈕
                                        decrC.addEventListener("click", () => {
                                            if(countInputC.value > 0) {
                                                countInputC.value--;
                                                totP -= i.price;
                                                totalP.innerText = "總價格為 : $" + totP;
                                                checkP.innerText = "總價格為 : $" + totP;
                                                totC --;
                                                totalC.innerText = "商品總數為 : " + totC;
                                            }
                            
                                            let body = {
                                                "order_status": {
                                                    "userId": sessionStorage.getItem("userId"),
                                                    "productId": i.productId,
                                                    "updateTime": i.updateTime,
                                                    "amount": countInputC.value
                                                }
                                            }
                            
                                            fetch("http://localhost:8080/change_cart_amount", {
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
                            
                                                    if(checkData.message === "移出購物車") {
                                                        cartI.innerHTML = "";
                                                        cartI.classList.remove("cartInfo");
                                                    }
                            
                                                }
                                            })
                                            .catch(function(error) {
                                                console.log(error)
                                            })
                                        
                                        })
                                
                                        // 監聽增加數量按鈕
                                        incrC.addEventListener("click", () => {
                                            if(countInputC.value < i.stock) {
                                                countInputC.value++;
                                                totP += i.price;
                                                totalP.innerText = "總價格為 : $" + totP;
                                                checkP.innerText = "總價格為 : $" + totP;
                                                totC ++;
                                                totalC.innerText = "商品總數為 : " + totC;
                                            }
                            
                                            let body = {
                                                "order_status": {
                                                    "userId": sessionStorage.getItem("userId"),
                                                    "productId": i.productId,
                                                    "updateTime": i.updateTime,
                                                    "amount": countInputC.value
                                                }
                                            }
                            
                                            fetch("http://localhost:8080/change_cart_amount", {
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
                            
                                        // 監聽input框
                                        countInputC.addEventListener("change", () => {
                            
                                            if(countInputC.value === "" || countInputC.value < 0) {
                                                countInputC.value = chaAmount;
                                            }
                            
                                            let body = {
                                                "order_status": {
                                                    "userId": sessionStorage.getItem("userId"),
                                                    "productId": i.productId,
                                                    "updateTime": i.updateTime,
                                                    "amount": countInputC.value
                                                }
                                            }
                            
                                            fetch("http://localhost:8080/change_cart_amount", {
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
                                                    
                                                    if(overSto.test(checkData.message)) {
                                                        countInputC.value = i.stock;
                                                    }
                            
                                                    if(checkData.message === "移出購物車") {
                                                        cartI.innerHTML = "";
                                                        cartI.classList.remove("cartInfo");
                                                    }
                                                }
                            
                                                totP += i.price * (countInputC.value - chaAmount);
                                                totalP.innerText = "總價格為 : $" + totP;
                                                checkP.innerText = "總價格為 : $" + totP;
                                                totC += +(countInputC.value - chaAmount);
                                                totalC.innerText = "商品總數為 : " + totC;
                                                chaAmount = countInputC.value;
                            
                                            })
                                            .catch(function(error) {
                                                console.log(error)
                                            })
                                        })
                                        
                                        // 刪除購物車的商品
                            
                                        const removeProB = document.querySelector(`#remove${i.productId}`);
                            
                                        removeProB.addEventListener("click", () => {
                                            
                                            let body = {
                                                "order_status": {
                                                    "userId": sessionStorage.getItem("userId"),
                                                    "productId": i.productId,
                                                    "updateTime": i.updateTime
                                                }
                                            }
                            
                                            fetch("http://localhost:8080/remove_pro_from_cart", {
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
                                                if(checkData) {
                                                    mge.innerHTML = "\u00A0" + `${checkData.message}` + "\u00A0";
                                                    setTimeout(() => {
                                                        mge.innerHTML = "";
                                                    }, 2000);
                                                }
                                                cartI.innerHTML = "";
                                                cartI.classList.remove("cartInfo")
                                                totP -= i.price * i.amount;
                                                totalP.innerText = "總價格為 : $" + totP;
                                                checkP.innerText = "總價格為 : $" + totP;
                                                totC -= i.amount;
                                                totalC.innerText = "商品總數為 : " + totC; 
                                            })
                                            .catch(function(error) {
                                                console.log(error)
                                            })
                                        })
                            
                                    })
                                }
                            })
                            .catch(function(error) {
                                console.log(error)
                            })
        
                        })
                        .catch(function(error) {
                            console.log(error)
                        })
                    })
                })
            }
        })
        .catch(function(error) {
            console.log(error)
        })
    })
    .catch(function(error) {
        console.log(error)
    })
})
