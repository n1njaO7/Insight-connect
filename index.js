import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push , onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://insightconnect-b0ec1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const feedbackInDB = ref(database , "Feedback")

const inputFeedbackEl = document.getElementById("input-feedback")
const publishBtn = document.getElementById("publish-btn")
const feedbackAreaEl = document.getElementById("feedback-area")

publishBtn.addEventListener("click",function(){
    let text = inputFeedbackEl.value 
    push(feedbackInDB,text)
    clearInputFeedbackArea()
})

function clearInputFeedbackArea()
{
    inputFeedbackEl.innerHTML=""
}

onValue(feedbackInDB,function(snapshot){
    if(snapshot.exists)
    {
        let textArray = Object.entries(snapshot.val())

        for(let i =0 ; i<textArray.length;i++)
            {
                let currentItem = textArray[i]
                appendFeedbackToFeedbackArea(currentItem)

            }
    }
})

appendFeedbackToFeedbackArea(item)
{
    let itemId = item[0]
    let itemValue = item[1]
    let liEl = document.createElement("li")
    liEl.textContent= itemValue
    feedbackAreaEl.append(liEl)
}