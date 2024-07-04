const loggedInUserName = document.querySelector(".loggedInUserName");
const logoutBtn = document.querySelector(".logoutBtn");

// Get the loggedIn user name from local storage add logged it in the main welcome message
const loggedInUser = localStorage.getItem("loggedInUser");

loggedInUserName.innerHTML = loggedInUser;

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "./index.html";
});
