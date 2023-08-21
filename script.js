// Firebase Realtime Database URL
const databaseURL = "https://escapehousecleaningfeedbacks-default-rtdb.firebaseio.com/";

// Fetch all feedback keys
fetch(`${databaseURL}/feedback.json`)
    .then(response => response.json())
    .then(feedbackData => {
        const feedbackContainer = document.getElementById("feedbackContainer");
        const expandedContainer = document.getElementById("expandedContainer");

        for (const feedbackKey in feedbackData) {
            const feedback = feedbackData[feedbackKey];
            const feedbackEntry = document.createElement("div");
            feedbackEntry.className = "feedback-entry";
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
