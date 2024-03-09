let elKarkasniyList = document.querySelector(".karkasniy-list")
let elNadumniyList = document.querySelector(".nadumniy-list")

let products = JSON.parse(window.localStorage.getItem("products"))



let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")
let datas = new Date()


let orderProductList = JSON.parse(window.localStorage.getItem("orderList")) || []


function renderProduct(arr, list, id){
    list.innerHTML = ""
    
    arr.map(item => {
        if(item.type == id){
            let elItem = document.createElement("li")
            elItem.classList.add("list-item")
            elItem.innerHTML = `
            <img src=${item.img} width="200" height="100" alt="render img"/>
            <div>
            <h2>${item.name}</h2>
            <small>${item.oldPrise}</small>
            <p>${item.newPrise}</p>
            <button class="Buyurtma-btn" onclick="orderProduct(${item.id})">Buyurtma bermoq</button>
            </div>
            `
            
            list.appendChild(elItem)
        }
        
        
    })
}

renderProduct(products, elKarkasniyList, "0")
renderProduct(products, elNadumniyList, "1")






// Order product start
function orderProduct(id){
    const data = products.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <div>
    <img src=${data.img} width="250" height="100"/>
    <p>price:${data.newPrise}</p>
    </div>
    <form class="modal-form">
    <input autocomplete required placeholder="Your name"/>
    <input autocomplete required placeholder="Phone number"/>
    <input autocomplete required placeholder="Adress"/>
    <button class="Buyurtma-btn">Buyurtma berish</button>
    </form>
    
    `
    let modalForm = document.querySelector(".modal-form")
    modalForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        
        
        let newTime = (`${datas.getDate().toString().padStart(2,"0")}.${(datas.getMonth() + 1).toString().padStart(2,"0")
    }.${datas.getFullYear()} ${datas.getHours().toString().padStart(2,"0")}: ${datas.getMinutes().toString().padStart(2,"0")}`);
    
    
    const orderData = {
        name:evt.target[0].value,
        phoneNumber:evt.target[1].value,
        address: evt.target[2].value,
        time:newTime,
        id:orderProductList.length ? orderProductList[orderProductList.length -1].id + 1 : 1,
        img:data.img,
        price: data.newPrise,
    }
    orderProductList.push(orderData)
    elModal.innerHTML =`
    <h2 class="order-remove">Thank you for order! Guest :) </h2>
    `
    
    setTimeout(() => {
        elModalWrapper.classList.remove("open-modal")
    },2000)
    window.localStorage.setItem("orderList", JSON.stringify(orderProductList))
} )
} 
// Order product end 



elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})


window.localStorage.setItem("orderList", JSON.stringify(orderProductList))