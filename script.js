// Firebase Realtime Database URL
const databaseURL = "https://escapehousecleaningfeedbacks-default-rtdb.firebaseio.com/";
const hardcodedPassword = "escape1109"; // Replace with your desired password
expandedContainer.style.display = "none"; 

function loginUser() {
    event.preventDefault();
    console.log("loginUser function called"); 
    const userpassword = document.getElementById("password").value;
    const feedbackContainer = document.getElementById("feedbackContainer");
    const loginPage = document.getElementById("loginPage"); // Assuming you have an element with this ID
    
    if (userpassword !== hardcodedPassword) {
        console.log("wrong password"); 
        feedbackContainer.style.display = "none";
        loginPage.style.display = "block";
        alert('Senha Incorreta');
    } else {
        expandedContainer.style.display = "none"; 
        console.log("password matches" + userpassword);
        feedbackContainer.style.display = "block";
        loginPage.style.display="none";
       // Fetch all feedback keys
       fetch(`${databaseURL}/feedback.json`)
    .then(response => response.json())
    .then(feedbackData => {
        const feedbackContainer = document.getElementById("feedbackContainer");
        const expandedContainer = document.getElementById("expandedContainer");

        // Convert the keys of feedbackData into an array and reverse it
        const feedbackKeys = Object.keys(feedbackData).reverse();

        for (const feedbackKey of feedbackKeys) {
            const feedback = feedbackData[feedbackKey];
            const feedbackEntry = document.createElement("div");
            feedbackEntry.className = "feedback-entry";

            if (feedback.rating === "regular" || feedback.rating === "bad") {
                feedbackEntry.style.backgroundColor = "rgba(88, 1, 1, 0.9)";; 
            }

            feedbackEntry.innerHTML = `
                <p><strong>Name:</strong> ${feedback.name}</p>
                <p><strong>Email:</strong> ${feedback.email}</p>
                <p><strong>Rating:</strong> ${feedback.rating}</p>
            `;
            feedbackEntry.addEventListener("click", () => {
                showExpandedInfo(feedback);
            });
            feedbackContainer.appendChild(feedbackEntry);

       
    }

    function showExpandedInfo(feedback) {
        feedbackContainer.style.display = "none"; 
        expandedContainer.innerHTML = `
            <h2>Feedback Information</h2>
            <p><strong>Name:</strong> ${feedback.name}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>Rating:</strong> ${feedback.rating}</p>
            <p><strong>Recommendation:</strong> ${feedback.recommendation}</p>
            <p><strong>Feedback Text:</strong> ${feedback.feedbackText}</p>
            <p><strong>Photos:</strong></p>
        `;
        if (feedback.photos && feedback.photos.length > 0) {
            for (const photoUrl of feedback.photos) {
                expandedContainer.innerHTML += `<img src="${photoUrl}" alt="Feedback Photo">`;
            }
        }

        const backButton = document.createElement("button");
        backButton.textContent = "Back";
        backButton.addEventListener("click", () => {
            expandedContainer.style.display = "none";
            feedbackContainer.style.display = "block";
        });
        expandedContainer.appendChild(backButton);
        expandedContainer.style.display = "block";
    }
})
.catch(error => {
    console.error("Error fetching data:", error);
});

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", loginUser);



    }
}


