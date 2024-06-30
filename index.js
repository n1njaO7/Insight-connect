import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://insightconnect-b0ec1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const feedbackInDB = ref(database , "Feedback")


const inputFeedbackEl = document.getElementById("input-feedback")
const publishBtnEl = document.getElementById("publish-btn")
const feedbackAreaEl = document.getElementById("feedback-area")
const fromUserEl = document.getElementById("from-btn")
const toUserEl = document.getElementById("to-btn")


publishBtnEl.addEventListener("click",function(){ 
    let feedbackMessage = inputFeedbackEl.value;
    let fromUser = fromUserEl.value;
    let toUser = toUserEl.value;
    if (feedbackMessage !== "" && fromUser !== "" && toUser !== "") 
        {
        let feedback = {
            message: feedbackMessage,
            from: fromUser,
            to: toUser
        }
    push(feedbackInDB,feedback)
    clearInputField()
    }
  
})


onValue(feedbackInDB,function(snapshot){
    if(snapshot.exists())
    {
        let textArray = Object.entries(snapshot.val())
        clearFeedbackArea()
        for(let i =0 ; i<textArray.length;i++)
        {
            let currentItem = textArray[i]
            appendFeedbackToFeedbackArea(currentItem)

        }
    }else {
        
        feedbackAreaEl.innerHTML = `<b>No Feedback here... yet</b>`
        }
})

function appendFeedbackToFeedbackArea(item)
{
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("div")
    newEl.innerHTML = `<strong>To:</strong> ${itemValue.to} <br> <strong>Feedback:</strong> ${itemValue.message} <br> <strong>From:</strong> ${itemValue.from}`;
    newEl.className = "feedback-item";
    
    
    newEl.addEventListener("dblclick",function(){
        let exactPositionOnDB = ref(database,`Feedback/${itemId}`)
        remove(exactPositionOnDB)
    });

    feedbackAreaEl.append(newEl)
}

function clearInputField()
{
    inputFeedbackEl.value=""
    fromUserEl.value = "";
    toUserEl.value = "";
}

function clearFeedbackArea()
{
    feedbackAreaEl.innerHTML=""
}
