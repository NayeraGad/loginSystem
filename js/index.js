const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const alertMess = document.querySelector(".alertMess");
const loginBtn = document.getElementById("loginBtn");

let users = JSON.parse(localStorage.getItem("users"));

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

// Login if email exists
function login() {
  if (loginEmail.value === "" || loginPass.value === "") {
    alertMess.innerHTML = `<p class="text-danger p-0">All inputs are required</p>`;
    return;
  }

  let loggedInUser;

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === loginEmail.value &&
      users[i].password === loginPass.value
    ) {
      loggedInUser = users[i].name;
      break;
    }
  }

  if (loggedInUser) {
    // Get user name and add it to local storage
    localStorage.setItem("loggedInUser", loggedInUser);
    const loginUrl = window.location.origin + "/pages/main.html";
    window.location.href = loginUrl;
  } else {
    alertMess.innerHTML = `<p class="text-danger p-0">Incorrect email or password</p>`;
  }
}

loginBtn.addEventListener("click", login);
