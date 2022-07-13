// check if user already sgin in
if (localStorage.getItem("user_open") != null) {
  location.href = "home-page.html";
}

//signin inputs
var user_email = document.getElementsByName("user_email");
var user_password = document.getElementsByName("user_password");

//signup inputs
var user_name = document.getElementsByName("user_name");
var user_email_s = document.getElementsByName("user_email_s");
var user_password_s = document.getElementsByName("user_password_s");
var re_password_s = document.getElementsByName("re_password_s");


//reset password
var user_email_r = document.getElementsByName("user_email_r");
var user_password_r = document.getElementsByName("user_password_r");
var re_password_r = document.getElementsByName("re_password_r");

// button to submit form
var sginin_btn = document.getElementById("sginin_btn");
var signup_btn = document.getElementById("signup_btn");
var r_next_btn = document.getElementById("r_next_btn");
var r_btn = document.getElementById("r_btn");
//-----------------------------------------------------------------------------

//button to target forms
var show_sginup_form = document.querySelector("#show_sginup_form");
var show_sginin_form = document.querySelector("#show_sginin_form");
var show_sginin_form_a = document.querySelector("#show_sginin_form_a");
var show_reset_form = document.querySelector("#show_reset_form");

// box containe all forms
var reg_form = document.querySelector(".reg-form");

// forms
var signin = document.querySelector("#signin");
var signup = document.querySelector("#signup");
var reset_password = document.querySelector("#reset_password");

// imags
var sginin_img = document.querySelector("#sginin_img");
var sginup_img = document.querySelector("#sginup_img");
var imgs_box = document.querySelector("#imgs_box");

var user_list;

// check if there is users list or not
if (localStorage.getItem("user_list") != null) {
  user_list = JSON.parse(localStorage.getItem("user_list"));
} else {
  user_list = [];
  fshow_sginup_form();
}

// show sginup form when user click sginup button
show_sginup_form.addEventListener("click", fshow_sginup_form);

function fshow_sginup_form() {
  reg_form.classList.add("move-right");
  sginin_img.classList.add("hide");
  sginup_img.classList.add("show");
  signin.classList.add("form-hide");
  signup.classList.add("form-show");
  imgs_box.classList.remove("ms-auto");
}

// show sginin form when user click sginin button
show_sginin_form.addEventListener("click", fshow_sginin_form);

function fshow_sginin_form() {
  reg_form.classList.remove("move-right");
  sginin_img.classList.remove("hide");
  sginup_img.classList.remove("show");
  signin.classList.remove("form-hide");
  signup.classList.remove("form-show");
  imgs_box.classList.add("ms-auto");
}

// show reset password form when user click reset button
show_reset_form.addEventListener("click", function () {
  reg_form.classList.add("move-all");
  signin.classList.add("form-hide");
  reset_password.classList.add("form-show");
});

// show sginup form when user click sginup button again
show_sginin_form_a.addEventListener("click", function () {
  reg_form.classList.remove("move-all");
  signin.classList.remove("form-hide");
  reset_password.classList.remove("form-show");
});

function clearform(form) {
  document.getElementById(form).reset();
}

//-------------------------------------------------------------------------
signup_btn.addEventListener("click", function () {
  if (validateinputs(user_name, /^[a-zA-Z]{2,20}$/, "username_alert_up")
    && validateinputs(user_email_s, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "email_alert_up")
    && validateinputs(user_password_s, /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password_alert_up")
    && passwordmatch(user_password_s, re_password_s, "repassword_alert_up")
    && emailcheck(user_email_s, "emailexist_alert_up")) {
    var new_user = {
      user_name: user_name[0].value,
      user_email: user_email_s[0].value,
      user_password: user_password_s[0].value,
    }
    user_list.push(new_user);
    localStorage.setItem("user_list", JSON.stringify(user_list));
    clearform("signup");
    fshow_sginin_form();
    document.getElementById("reg_success").classList.add("show")
  }
});

// sgin in
sginin_btn.addEventListener("click", function () {
  if (user_list.length > 0) {
    for (var i = 0; i < user_list.length; i++) {
      if (user_list[i].user_email.toLowerCase() == user_email[0].value.toLowerCase()
        && user_list[i].user_password == user_password[0].value) {
        localStorage.setItem("user_open", JSON.stringify(user_list[i].user_name));
        window.location.href = "home-page.html";
        document.getElementById("invalid_sginin").style.display = "none";
        return;
      } else {
        document.getElementById("invalid_sginin").style.display = "block";
      }
    }
  }
})

// valdiation function
function validateinputs(input, regex, alert) {
  var vaild = false;
  if (regex.test(input[0].value)) {
    document.getElementById(alert).style.display = "none";
    vaild = true;
  } else {
    document.getElementById(alert).style.display = "block";
    vaild = false;
  }
  return vaild;
}

// function to check if password match or equel
function passwordmatch(input1, input2, alert) {
  var vaild = false;
  if (input1[0].value == input2[0].value) {
    document.getElementById(alert).style.display = "none";
    vaild = true;
  } else {
    document.getElementById(alert).style.display = "block";
    vaild = false;
  }
  return vaild;
}

// function to check if this email is exist or not
function emailcheck(input, alert) {
  var vaild = true;
  if (user_list.length > 0) {
    for (var i = 0; i < user_list.length; i++) {
      if (user_list[i].user_email.toLowerCase() == input[0].value.toLowerCase()) {
        document.getElementById(alert).style.display = "block";
        vaild = false;
      } else {
        document.getElementById(alert).style.display = "none";
        vaild = true;
      }
    }
  }
  return vaild;
}

var userindex_r;
var username_r;

// reset password step 1
r_next_btn.addEventListener("click", function () {
  for (var i = 0; i< user_list.length; i++) {
    if (user_list[i].user_email.toLowerCase() == user_email_r[0].value.toLowerCase()) {
      document.getElementById("email_r").style.display = "none";
      reset_password.classList.add("reset-password-form-step");
      userindex_r = i;
      username_r = user_list[i].user_name;
    } else {
      if (user_email_r[0].value == 0) {
        document.getElementById("email_r").innerHTML = "how we search for empty field";
        document.getElementById("email_r").style.display = "block";
      } else {
        document.getElementById("email_r").innerHTML = "this email is not found";
        document.getElementById("email_r").style.display = "block";
      }
    }
  }
})

// reset password step 2
r_btn.addEventListener("click", function() {
  if (validateinputs(user_password_r, /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password_alert_rv")
    && passwordmatch(user_password_r, re_password_r, "repassword_alert_r")) {
    var new_user = {
      user_name: username_r,
      user_email: user_email_r[0].value,
      user_password: user_password_r[0].value,
    }
    user_list[userindex_r] = new_user;
    localStorage.setItem("user_list", JSON.stringify(user_list));
    location.reload();
  }
})