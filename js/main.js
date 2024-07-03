const loggedInUserName = document.querySelector(".loggedInUserName");
const logoutBtn = document.querySelector(".logoutBtn");

// Add logged in user name in main welcome message
const loggedInUser = localStorage.getItem("loggedInUser");

loggedInUserName.innerHTML = loggedInUser;

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/index.html";
});
