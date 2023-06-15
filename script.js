"use strict";
const searchNameInput = document.querySelector("#search-name");
const searchPhoneInput = document.querySelector("#tel-number");
const addBtn = document.querySelector(".add-btn");
const listContainer = document.querySelector("ul");
const form = document.querySelector("form");
let nameList = [];

const createElements = (name, phone, id) => {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `
     <div class="contact-info">
           <h5>${name}</h5>
           <p>${phone}</p>
        </div>

        <p class="icons">
        <a>
        <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </a>

        <a class="callIcon" href = "tel:${phone}">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        </a>
        </p>
    `
    listContainer.appendChild(li);
    const deleteBtn = li.querySelector('.deleteIcon')
    deleteBtn.addEventListener('click',()=>{
        deletContact(name,id,li)
    })

}


const addData = (e) => {
    e.preventDefault();
    const id = Math.floor(Date.now())
    const userData = {
        id: id,
        name: searchNameInput.value,
        phone: searchPhoneInput.value,
    };
    nameList.push(userData);
    createElements(userData.name, userData.phone, id)
    storeData(nameList)
    resetInput()
};

const storeData = (nameList) => {
    localStorage.setItem('dataList', JSON.stringify(nameList))
}

const getStoredData = () => {
    if (localStorage.getItem('dataList'))
        return JSON.parse(localStorage.getItem('dataList'))
    return [];
}

const init = () => {
    const data = getStoredData()
    displayItems(data)
}

const displayItems = (nameList) => {
    nameList.forEach(ele => {
        createElements(ele.name, ele.phone, ele.id)
    })
}

const deletContact =(name,id,li)=> {
    nameList = nameList.filter(data => data.id !== id && data.name !== name)
    localStorage.setItem('dataList', JSON.stringify(nameList))
    li.remove()
}

const resetInput = ()=> {
    searchNameInput.value = ''
    searchPhoneInput.value = ''
}

init()

form.addEventListener("submit", addData);
