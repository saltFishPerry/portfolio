function checkValidEmail() {
    const invalidEmailText = document.getElementById("email-invalid-text");
    const emailInput = document.getElementById("email-input");
    let emailValue = emailInput.value.toLowerCase();
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(emailValue) == true){
        return true
    }else{
        invalidEmailText.style.visibility = "visible";
        emailInput.style.borderColor = "var(--Tomato)";
        return false;
    }
}