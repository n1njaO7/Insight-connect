import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
<<<<<<< HEAD
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
=======
import { getDatabase, ref, push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
>>>>>>> 6fdc2eaf008bb594ddbb01e73be9b093e7786d4e

const appSettings = {
    databaseURL: "https://insightconnect-b0ec1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const feedbackInDB = ref(database, "Feedback")

<<<<<<< HEAD
const inputFeedbackEl = document.getElementById("input-feedback")
const publishBtnEl = document.getElementById("publish-btn")
const feedbackAreaEl = document.getElementById("feedback-area")
const fromUserEl = document.getElementById("from-btn")
const toUserEl = document.getElementById("to-btn")

publishBtnEl.addEventListener("click", function () {
    let feedbackMessage = inputFeedbackEl.value
    let fromUser = fromUserEl.value
    let toUser = toUserEl.value
    if (feedbackMessage !== "" && fromUser !== "" && toUser !== "") {
        let feedback = {
            message: feedbackMessage,
            from: fromUser,
            to: toUser,
            likes: 0
        }
        push(feedbackInDB, feedback)
        clearInputField()
=======

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
>>>>>>> 6fdc2eaf008bb594ddbb01e73be9b093e7786d4e
    }
})

<<<<<<< HEAD
onValue(feedbackInDB, function (snapshot) {
    if (snapshot.exists()) {
=======

onValue(feedbackInDB,function(snapshot){
    if(snapshot.exists())
    {
>>>>>>> 6fdc2eaf008bb594ddbb01e73be9b093e7786d4e
        let textArray = Object.entries(snapshot.val())
        clearFeedbackArea()
        for (let i = 0; i < textArray.length; i++) {
            let currentItem = textArray[i]
            appendFeedbackToFeedbackArea(currentItem)
<<<<<<< HEAD
=======

        }
    }else {
        
        feedbackAreaEl.innerHTML = `<b>No Feedback here... yet</b>`
>>>>>>> 6fdc2eaf008bb594ddbb01e73be9b093e7786d4e
        }
    } else {
        feedbackAreaEl.innerHTML = `<b></b>`
    }
})

function appendFeedbackToFeedbackArea(item) {
    let itemId = item[0]
    let itemValue = item[1]
<<<<<<< HEAD

    
    if (typeof itemValue.likes !== 'number') {
        itemValue.likes = 0
    }

    let newEl = document.createElement("div")
    newEl.className = "feedback-item"
    newEl.innerHTML = `
        <strong>To:</strong> ${itemValue.to} <br>
        <strong>Feedback:</strong> ${itemValue.message} <br>
        <strong>From:</strong> ${itemValue.from}
        <div class="feedback-actions">
            <span id="like-icon-${itemId}" class="like-icon">${itemValue.likes > 0 ? '&#9829;' : '&#9825;'}</span>
            <span id="like-count-${itemId}">${itemValue.likes}</span>
        </div>`

    newEl.addEventListener("dblclick", function () {
        let exactPositionOnDB = ref(database, `Feedback/${itemId}`)
=======
    let newEl = document.createElement("div")
    newEl.innerHTML = `<strong>To:</strong> ${itemValue.to} <br> <strong>Feedback:</strong> ${itemValue.message} <br> <strong>From:</strong> ${itemValue.from}`;
    newEl.className = "feedback-item";
    
    
    newEl.addEventListener("dblclick",function(){
        let exactPositionOnDB = ref(database,`Feedback/${itemId}`)
>>>>>>> 6fdc2eaf008bb594ddbb01e73be9b093e7786d4e
        remove(exactPositionOnDB)
    });

    feedbackAreaEl.append(newEl)
<<<<<<< HEAD

    const likeIcon = document.getElementById(`like-icon-${itemId}`)
    const likeCount = document.getElementById(`like-count-${itemId}`)

    likeIcon.addEventListener('click', function () {
        itemValue.likes++
        likeIcon.classList.add('liked')
        likeIcon.innerHTML = '&#9829;' // Filled heart icon
        likeCount.textContent = itemValue.likes

       
        const exactPositionOnDB = ref(database, `Feedback/${itemId}`)
        update(exactPositionOnDB, { likes: itemValue.likes })
    })
}

function clearInputField() {
    inputFeedbackEl.value = ""
    fromUserEl.value = ""
    toUserEl.value = ""
}

function clearFeedbackArea() {
    feedbackAreaEl.innerHTML = ""
=======
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
>>>>>>> 6fdc2eaf008bb594ddbb01e73be9b093e7786d4e
}
