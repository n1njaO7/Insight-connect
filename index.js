import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://insightconnect-b0ec1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const feedbackInDB = ref(database, "Feedback")

const inputFeedbackEl = document.getElementById("input-feedback")
const publishBtnEl = document.getElementById("publish-btn")
const feedbackAreaEl = document.getElementById("feedback-area")
const fromUserEl = document.getElementById("from-input")
const toUserEl = document.getElementById("to-input")

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
    }
})

onValue(feedbackInDB, function (snapshot) {
    if (snapshot.exists()) {
        let textArray = Object.entries(snapshot.val())
        clearFeedbackArea()
        for (let i = 0; i < textArray.length; i++) {
            let currentItem = textArray[i]
            appendFeedbackToFeedbackArea(currentItem)
        }
    } else {
        feedbackAreaEl.innerHTML = `<b></b>`
    }
})

function appendFeedbackToFeedbackArea(item) {
    let itemId = item[0]
    let itemValue = item[1]

    
    if (typeof itemValue.likes !== 'number') {
        itemValue.likes = 0
    }

    let newEl = document.createElement("div")
    newEl.className = "feedback-item"
    newEl.innerHTML = `<br>
        <strong>To:</strong> ${itemValue.to} <br><br>
        <strong>Feedback:</strong> ${itemValue.message} <br><br>
        <strong>From:</strong> ${itemValue.from}
        <div class="feedback-actions">
            <span id="like-icon-${itemId}" class="like-icon">${itemValue.likes > 0 ? '&#9829;' : '&#9825;'}</span>
            <span id="like-count-${itemId}">${itemValue.likes}</span>
            <span class="delete-icon" id="delete-icon-${itemId}">
                <i class="fas fa-trash"></i>
            </span>
        </div>`



    feedbackAreaEl.append(newEl)

    const likeIcon = document.getElementById(`like-icon-${itemId}`)
    const likeCount = document.getElementById(`like-count-${itemId}`)
    const deleteIcon = document.getElementById(`delete-icon-${itemId}`)

    likeIcon.addEventListener('click', function () {
        itemValue.likes++
        likeIcon.classList.add('liked')
        likeIcon.innerHTML = '&#9829;' // Filled heart icon
        likeCount.textContent = itemValue.likes

        
        const exactPositionOnDB = ref(database, `Feedback/${itemId}`)
        update(exactPositionOnDB, { likes: itemValue.likes })
    })

      deleteIcon.addEventListener("click", function () {
        let exactPositionOnDB = ref(database, `Feedback/${itemId}`);
        remove(exactPositionOnDB);
    });
}

function clearInputField() {
    inputFeedbackEl.value = ""
    fromUserEl.value = ""
    toUserEl.value = ""
}

function clearFeedbackArea() {
    feedbackAreaEl.innerHTML = ""
}
