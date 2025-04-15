

// Check if the user has logged in today
function checkDailyStreak() {
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (lastVisit === today) {
        alert("You’ve already logged in today.");
    } else {
        streak += 1; // Increment streak
        localStorage.setItem("lastVisit", today);
        document.getElementById("streak").textContent = streak;
        alert("Daily streak updated! Keep it up!");
    }
}

// Call this function when the user logs in
checkDailyStreak();

//Frontend Error Handling with JavaScript
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = this.email.value;
    const password = this.password.value;

    // Send login request via Fetch API
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
        // Redirect to the provided URL on success
        window.location.href = result.redirectUrl;
    } else {
        // Display the error message
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = result.error;
        errorMessage.classList.add('active');
    }
});


