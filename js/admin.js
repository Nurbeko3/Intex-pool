
let elAddButton = document.querySelector(".add-button")
let tBody = document.querySelector(".tbody")
let tHead = document.querySelector(".thead")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let elNavList = document.querySelector(".nav-list")
let elItem1 = document.querySelector(".item1")
let elItem2 = document.querySelector(".item2")
let elItem3 = document.querySelector(".item3")

let elSearchInput = document.querySelector(".search-input")


let orderProduct = JSON.parse(window.localStorage.getItem("orderList")) || []


elNavList.addEventListener("click", function(evt) {
    if(evt.target.id){
        if(evt.target.id == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
            elItem3.classList.remove("text-teal-500")
            renderProducts(products, tBody, evt.target.id)
        }
        else if(evt.target.id == 1) {
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
            elItem3.classList.remove("text-teal-500")
            renderProducts(products, tBody, evt.target.id)
        }
        else{
            elItem2.classList.remove("text-teal-500")
            elItem1.classList.remove("text-teal-500")
            elItem3.classList.add("text-teal-500")
            renderProducts(orderProduct, tBody, evt.target.id)
        }

    }
})


let products = JSON.parse(window.localStorage.getItem("products")) || []
// Add product start 
elAddButton.addEventListener("click", function(){   
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <form class="add-form">
    <label>
    <div class="w-[80%] bg-white mx-auto">
    <img class="rounded-[50px] h-[250px] render-img" src="./images/choose-img.png" alt="" width="100%" height="100%"/>
    </div>
    <input class="visually-hidden get-img" type="file"/>
    </label>
    <div class="p-3 bg-white mt-5 flex justify-between">
    <div class="w-[49%] flex flex-col gap-5">
    <label class="flex flex-col">
    <span class="">Enter product name</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product name"/>
    </label>
    <label class="flex flex-col">
    <span class="">Enter product old price</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product old price"/>
    </label>
    <label class="flex flex-col">
    <span class="">Enter product new price</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product new price"/>
    </label>
    </div>
    <div class="w-[49%] flex flex-col gap-5">
    <label class="flex flex-col">
    <span class="">Enter product quantity</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product quantity"/>
    </label>
    <label class="flex flex-col">
    <span class="">Choose type</span>
    <select class="p-2 border-[1px] border-black rounded-md">
    <option value="0">Каркасные</option>
    <option value="1">Надувные</option>
    </select>
    </label>
    <label class="flex flex-col">
    <span class="">Choose status</span>
    <select class="p-2 border-[1px] border-black rounded-md">
    <option value="0">Not</option>
    <option value="1">Рекомендуем</option>
    <option value="2">Cкидка</option>
    <option value="3">Нет в наличии</option>
    </select>
    </label>
    </div>
    </div>
    <button class="bg-teal-500 p-2 font-bold rounded-[15px] text-white w-[200px] block mx-auto my-5">Добавить</button>
    </form>
    `
    let elForm = document.querySelector(".add-form")
    let elInputChange = document.querySelector(".get-img")
    let elRenderImg = document.querySelector(".render-img")
    
    elInputChange.addEventListener("change", function(evt){
        
        elRenderImg.src =  URL.createObjectURL(evt.target.files[0]);
    })
    
    elForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        let data = {
            id:products.length ? products[products.length - 1].id + 1 : 1,
            img:URL.createObjectURL(evt.target[0].files[0]),
            name:evt.target[1].value,
            oldPrise:evt.target[2].value,
            newPrise:evt.target[3].value,
            quantity:evt.target[4].value,
            type:evt.target[5].value,
            status:evt.target[6].value
        }
        products.push(data)
        renderProducts(products, tBody, evt.target[5].value)
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))
        if(evt.target[5].value == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else{
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }
    })
})
// Add product end 

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})

function renderProducts(arr, list, id){
    list.innerHTML = ""
    arr.filter(item => {
        if(item.type == id){
            tHead.innerHTML = `
            <tr>
                <th class="bg-slate-200 w-[250px] p-3 rounded-l-[25px]">Rasmkar</th>
                <th class="bg-slate-200 w-[250px] p-3">Nomi</th>
                <th class="bg-slate-200 w-[250px] p-3">Narxi</th>
                <th class="bg-slate-200 w-[250px] p-3">Miqdori</th>
                <th class="bg-slate-200 w-[250px] p-3">Holati</th>
                <th class="bg-slate-200 w-[250px] p-3">Batafsil</th>
            
                </tr>
            `
            let elTr = document.createElement("tr")
            elTr.innerHTML = `
            <td class="text-center p-1 bg-slate-300 rounded-l-[20px]">
                <img class="mx-auto" src=${item.img} alt="Render img" width="40" height="40"/>
            </td>
            <td class="text-center p-1 bg-slate-300 text-[20px]">${item.name}</td>
            <td class="text-center p-1 bg-slate-300 flex flex-col">
                <span class="text-[13px] line-through ">${item.oldPrise}</span>
                <strong class="text-[18px] line-throw">${item.newPrise}</strong>
            </td>
            <td class="text-center p-1 bg-slate-300">${item.quantity}</td>
            <td class="text-center p-1 bg-slate-300 ${item.status == "1" ? "text-green-500" : ""} ${item.status == "2" ? "text-yellow-500" : ""} ${item.status == "3" ? "text-red-500" : ""}">
                ${item.status == "0" ? "Простой" : ""}
                ${item.status == "1" ? "Рекомендуем" : ""}
                ${item.status == "2" ? "Cкидка" : ""}
                ${item.status == "3" ? "Нет в наличии" : ""}
            </td>
            <td class="text-center p-1 bg-slate-300 rounded-r-[20px]">
                <button onclick="updateProduct(${item.id})" class="p-1 bg-green-500 text-white rounded-md">Update</button>
                <button onclick="deleteProduct(${item.id})" class="p-1 bg-red-500 text-white rounded-md">Delete</button>
            </td>
            `
            list.appendChild(elTr)
        }
    })
    if(id == "2"){
        tHead.innerHTML = `
        <tr>
            <th class="bg-slate-200 w-[250px] p-3 rounded-l-[25px]">Client name</th>
            <th class="bg-slate-200 w-[250px] p-3">Client number</th>
            <th class="bg-slate-200 w-[250px] p-3">Image</th>
            <th class="bg-slate-200 w-[250px] p-3">Price</th>
            <th class="bg-slate-200 w-[250px] p-3">Adress</th>
            <th class="bg-slate-200 w-[250px] p-3">Time</th>
            <th class="bg-slate-200 w-[250px] p-3" rounded-r-[25px]">Deystviya</th>

            </tr>
        `
        arr.map(item => {
            let elTr = document.createElement("tr")
            elTr.innerHTML = `
                <td class="text-center p-1 bg-slate-300 rounded-l-[20px]">${item.name}</td>
                <td class="text-center p-1 bg-slate-300">${item.phoneNumber}</td>
                  <img class="mx-auto" src=${item.img} alt="Render img" width="40" height="40"/>
                <td class="text-center p-1 bg-slate-300 text-[20px]">${item.price}</td>
                <td class="text-center p-1 bg-slate-300 text-[20px]">${item.adress}</td>
                <td class="text-center p-1 bg-slate-300 text-[20px] ">${item.time}</td>
                <td class="text-center p-1 bg-slate-300 text-[20px] rounded-r-[20px]">Check , Delete</td>
            `
            list.appendChild(elTr)
        } )
    }
}
renderProducts(products, tBody, 0)



// Update Part start
function updateProduct(id){
    let data = products.find(item => item.id == id)
    
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <form class="update-form">
    <label>
    <div class="w-[80%] bg-white mx-auto">
    <img class="rounded-[50px] h-[250px] update-render-img" src=${data.img} alt="" width="100%" height="100%"/>
    </div>
    <input class="visually-hidden update-get-img" type="file"/>
    </label>
    <div class="p-3 bg-white mt-5 flex justify-between">
    <div class="w-[49%] flex flex-col gap-5">
    <label class="flex flex-col">
    <span class="">Enter product name</span>
    <input value=${data.name} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product name"/>
    </label>
    <label class="flex flex-col">
    <span class="">Enter product old price</span>
    <input value=${data.oldPrise} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product old price"/>
    </label>
    <label class="flex flex-col">
    <span class="">Enter product new price</span>
    <input value=${data.newPrise} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product new price"/>
    </label>
    </div>
    <div class="w-[49%] flex flex-col gap-5">
    <label class="flex flex-col">
    <span class="">Enter product quantity</span>
    <input value=${data.quantity} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product quantity"/>
    </label>
    <label class="flex flex-col">
    <span class="">Choose type</span>
    <select class="p-2 border-[1px] border-black rounded-md update-type-select">
    <option value="0">Каркасные</option>
    <option value="1">Надувные</option>
    </select>
    </label>
    <label class="flex flex-col">
    <span class="">Choose status</span>
    <select class="p-2 border-[1px] border-black rounded-md update-status-select">
    <option value="0">Not</option>
    <option value="1">Рекомендуем</option>
    <option value="2">Cкидка</option>
    <option value="3">Нет в наличии</option>
    </select>
    </label>
    </div>
    </div>
    <button class="bg-teal-500 p-2 font-bold rounded-[15px] text-white w-[200px] block mx-auto my-5">Добавить</button>
    </form>
    `
    
    let elUpdateForm = document.querySelector(".update-form")
    let elTypeSelect = document.querySelector(".update-type-select")
    let elStatusSelect = document.querySelector(".update-status-select")
    let elUpdateImgInput = document.querySelector(".update-get-img")
    let elUpdateImg = document.querySelector(".update-render-img")
    
    elTypeSelect.value = data.type
    elStatusSelect.value = data.status
    
    elUpdateImgInput.addEventListener("change", function(evt){
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0])
    })
    
    elUpdateForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.oldPrise = evt.target[2].value
        data.newPrise = evt.target[3].value
        data.quantity = evt.target[4].value
        data.type = evt.target[5].value
        data.status = evt.target[6].value
        
        renderProducts(products, tBody , evt.target[5].value)
        
        
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))
        if(evt.target[5].value == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else{
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }
    })
}

// Update Part end


//Delete start 
function deleteProduct(id){
    const findObj = products.find(item=> item.id == id)
    let finedIndex = products.findIndex(item => item.id == id)
    let confirmDelete = confirm()
    if(confirmDelete){
        products.splice(finedIndex, 1)
        renderProducts(products, tBody, findObj.type)
        window.localStorage.setItem("products", JSON.stringify(products))
    }
    else{
        renderProducts(products, tBody, findObj.type)
    }
}
//Delete end 

let elSearchList = document.querySelector(".search-list")


//Search start
elSearchInput.addEventListener("keyup", function(evt){
    let data = products.filter(item => item.name.toLowerCase().includes(evt.target.value.toLowerCase()))
    elSearchList.innerHTML=``
    data.map(item => {
        let elListItem = document.createElement("li")
        elListItem.className = `p-[5px] hover:bg-white rounded-[20px] cursor-pointer`
        elListItem.dataset.id = item.id
        elListItem.textContent = `${item.name} - ${item.newPrise}`
        elSearchList.appendChild(elListItem)
        
        elListItem.addEventListener("click",function(evt){
            let clickedId = evt.target.dataset.id
            let dataClick = products.find(item => item.id == clickedId)
            elSearchInput.value = `${dataClick.name} - ${dataClick.newPrise}`
            
            
            let searchFilter = products.filter(item => item.id = clickedId)
            renderProducts(searchFilter, tBody, dataClick.type)
            if(dataClick.type == 0){
                elItem1.classList.add("text-teal-500")
                elItem2.classList.remove("text-teal-500")
            }
            else{
                elItem2.classList.add("text-teal-500")
                elItem1.classList.remove("text-teal-500")
            }
        })
        
    })
    if(evt.target.value){
        elSearchList.classList.add("open-list")
    }
    else{
        elSearchList.classList.remove("open-list")
        renderProducts(products, tBody, "0")
        elItem2.classList.add("text-teal-500")
        elItem1.classList.remove("text-teal-500")
    }
})

elSearchInput.addEventListener("blur", function(evt){
    elSearchList.classList.remove("open-list")
})
//Search end


