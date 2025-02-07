document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username and password match
    const user = users.find(user => user.name === username && user.password === password);

    if (user) {
        alert(`Welcome, ${user.name}!`);
        window.location.href = "products.html";
    } else {
        document.getElementById("login-error").textContent = "Incorrect Username or Password!";
    }
});