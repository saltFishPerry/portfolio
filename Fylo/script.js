// Disable all img drag

document.querySelectorAll('img').forEach(e => {
    e.setAttribute('draggable', false);
})

// Form validation

document.getElementById('submitBtn').addEventListener('click', e => {
    e.preventDefault();

    let textField = document.getElementById('email');
    let errTxt = document.querySelector('.form__errElem');

    errTxt.classList.add('hide');

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textField.value)){
        alert("Registration successful !")
    } else{
        errTxt.classList.remove('hide');
        textField.focus();
    }
})