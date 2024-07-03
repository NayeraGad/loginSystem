const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPass = document.getElementById("userPass");

const alertMess = document.querySelector(".alertMess");

const signUpBtn = document.querySelector(".signupBtn");

// Global variables
let users = [];
let nameRegex = /^[a-zA-Z].{5,15}$/;
let emailRegex =
  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/;
let passRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,15}$/;

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

// Check if user already exist
function isExist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === userEmail.value) {
      return true;
    }
  }
}

// Check validation
function validate(regex, input) {
  let isValid = regex.test(input.value);

  if (isValid) {
    console.log("done");
    input.classList.remove("is-invalid");
    return true;
  } else {
    console.log(input.value);
    input.classList.add("is-invalid");
    return false;
  }
}

// Add new users
function addUser() {
  // Check if inputs are empty
  if (
    userName.value === "" ||
    userEmail.value === "" ||
    userPass.value === ""
  ) {
    alertMess.innerHTML = `<p class="text-danger p-0">All inputs are required</p>`;
    return;
  }

  // Check if users email exist
  if (isExist() === true) {
    alertMess.innerHTML = `<p class="text-danger p-0">Email already exist</p>`;
    return;
  }

  // If email does not exist check validation
  // Then store new user
  if (validate(nameRegex, userName) === false) {
    alertMess.innerHTML = `<p class="text-danger p-0">Invalid name <br />
    Name should begin with letter and contain from 8 to 15 characters</p>`;
    return;
  }

  if (validate(emailRegex, userEmail) === false) {
    alertMess.innerHTML = `<p class="text-danger p-0">Invalid email</p>`;
    return;
  }

  if (validate(passRegex, userPass) === false) {
    alertMess.innerHTML = `<p class="text-danger p-0">Invalid password <br />
      Password should contain between 8 to 15 characters, at least one letter, one number and one special character</p>`;
    return;
  }

  alertMess.innerHTML = `<p class="text-success p-0">Success</p>`;

  let userInfo = {
    name: userName.value,
    email: userEmail.value,
    password: userPass.value,
  };

  users.push(userInfo);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);
}

signUpBtn.addEventListener("click", addUser);

