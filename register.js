document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    // Get stored users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists
    const userExists = users.some(user => user.name === name);

    if (userExists) {
        alert("This user is already registered!");
        return;
    }

    // Add the new user to the array and save it to localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login page
    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
});
