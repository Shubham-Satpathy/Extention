let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const clearBtn=document.getElementById("clear-btn")
const tabBtn=document.getElementById("tab-btn")
const ulEl=document.getElementById("ul-el")

const cross=`<img src="./bin.png">`;

let localValue=JSON.parse(localStorage.getItem("myLeads"))
if(localValue){
    myLeads=localValue
    render(myLeads)
}
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        addNew(tabs[0].url);
    })
})
clearBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[]
    clear();
})
inputBtn.addEventListener("click",function(){
    if(inputEl.value){
        myLeads.push(inputEl.value)
        addNew(inputEl.value);
        inputEl.value=""
    }
})

function addNew(lead){
    console.log(myLeads);
    const btn=document.createElement('BUTTON');
    btn.classList="cross";
    btn.innerHTML=cross;
    const li=document.createElement('LI');
    const a=document.createElement('A');
    a.setAttribute('target','_blank');
    a.setAttribute('href',lead);
    a.append(lead);
    li.append(a);
    li.append(btn);
    ulEl.append(li);
    listener();
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
}

function render(leads){
    console.log(leads);
    clear();
    for(let i=0;i<leads.length;i++){
        const btn=document.createElement('BUTTON');
        btn.classList="cross";
        btn.innerHTML=cross;
        const li=document.createElement('LI');
        const a=document.createElement('A');
        a.setAttribute('target','_blank');
        a.setAttribute('href',leads[i]);
        a.append(leads[i]);
        li.append(a);
        li.append(btn);
        ulEl.append(li);
    }
    listener();
    localStorage.setItem("myLeads",JSON.stringify(leads))
}

function clear(){
    while(ulEl.firstChild){
        ulEl.removeChild(ulEl.firstChild);
    }
}
function listener(){
    const crossEl=document.querySelectorAll('.cross');
    crossEl.forEach(e=>{
        e.addEventListener('dblclick',crossClicked);
    })
}

function crossClicked(e){
    const del=e.srcElement.parentNode.parentNode;
    console.log(del);
    myLeads=myLeads.filter(c=>c!=del.firstChild.textContent);
    del.remove();
    console.log(myLeads);
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
}