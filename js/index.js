// Inputs
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPass = document.getElementById("userPass");

// Alert block
const alertMess = document.querySelector(".alert");

// Buttons
const signUpBtn = document.querySelector(".signupBtn");

// Global variables
let users = [];
let nameRegex = /^[a-zA-Z].{5,15}$/;
let emailRegex =
  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/;
let passRegex = /^[a-zA-Z].{7,15}$/;

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

/* 
Start of SignUp page logic
*/

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
    alertMess.innerHTML = "All inputs are required";
    alertMess.classList.replace("text-success", "text-danger");
    return;
  }

  // Check if users email exist
  if (isExist() === true) {
    alertMess.innerHTML = "Email already exist";
    alertMess.classList.replace("text-success", "text-danger");
    return;
  }

  // If email does not exist check validation
  // Then store new user
  if (validate(nameRegex, userName) === false) {
    alertMess.innerHTML =
      "Invalid name \n Name should begin with letter and contain from 8 to 15 letters";
    alertMess.classList.replace("text-success", "text-danger");
    return;
  }

  if (validate(emailRegex, userEmail) === false) {
    alertMess.innerHTML = "Invalid email";
    alertMess.classList.replace("text-success", "text-danger");
    return;
  }

  if (validate(passRegex, userPass) === false) {
    alertMess.innerHTML =
      "Invalid password \n Password should begin with letter and contain from 8 to 15 letters";
    alertMess.classList.replace("text-success", "text-danger");
    return;
  }

  alertMess.innerHTML = "Success";
  alertMess.classList.replace("text-danger", "text-success");

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

/* 
End of SignUp page logic
*/
