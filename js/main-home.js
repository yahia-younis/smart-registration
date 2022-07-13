var welcome_mess = document.getElementById("welcome_mess");
var log_out = document.getElementById("log_out");

// check if user already sgin in or not
if (localStorage.getItem("user_open") != null) {
  welcome_mess.innerHTML = "Hi " + localStorage.getItem("user_open")
} else {
  location.href = "index.html";
}

// logout and remove localstorage when user click on btn
log_out.addEventListener("click", function() {
  localStorage.removeItem("user_open");
  location.href = "index.html";
});