
let myLinks = []
if(localStorage.getItem("links") == null)
    localStorage.setItem("links", JSON.stringify(myLinks))
else
    myLinks = JSON.parse(localStorage.getItem("links"))

const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
const inputBTN = document.getElementById("input-btn")
const clearBTN = document.getElementById("clear-btn")
const tabBTN = document.getElementById("tab-btn")

renderLinks()

inputBTN.addEventListener("click", function(){ 
    myLinks = JSON.parse(localStorage.getItem("links"))
    myLinks.push(inputEl.value)
    localStorage.setItem("links", JSON.stringify(myLinks))
    inputEl.value = ""
    renderLinks()
})

clearBTN.addEventListener("click", function(){
    localStorage.setItem("links", "[]")
    myLinks = []
    renderLinks()
})

tabBTN.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks = JSON.parse(localStorage.getItem("links"))
        myLinks.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(myLinks))
        renderLinks()
    })
})

function renderLinks(){
    let listItems = ""
    for(let i = 0; i < myLinks.length; i++){
        listItems += `<li><a target="_blank" href="${myLinks[i]}">${myLinks[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}
