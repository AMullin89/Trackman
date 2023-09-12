const passwordInputElement = document.getElementById('password');
const confirmPasswordInputElement = document.getElementById('confirm-password')
const minCharIcon = document.getElementById('minChar');
const minNumIcon = document.getElementById('minNum');
const minCapIcon = document.getElementById('minCap');
const passwordMatch = document.getElementById('password-match');

passwordInputElement.onkeyup = function (){

    if (this.value.length >= 8) {
        minCharIcon.classList.remove('fa-circle-xmark');
        minCharIcon.classList.add('fa-circle-check');
        minCharIcon.style.fontWeight = "bold";
        
    } else {
        minCharIcon.classList.remove('fa-circle-check');
        minCharIcon.classList.add('fa-circle-xmark');
        minCharIcon.style.fontWeight = "normal";
    }

    if (/\d/.test(this.value) === true){
        minNumIcon.classList.remove('fa-circle-xmark');
        minNumIcon.classList.add('fa-circle-check');
        minNumIcon.style.fontWeight = "bold";
    } else {
        minNumIcon.classList.remove('fa-circle-check');
        minNumIcon.classList.add('fa-circle-xmark');
        minNumIcon.style.fontWeight = "normal";
    }

    if (/[A-Z]/.test(this.value) === true){
        minCapIcon.classList.remove('fa-circle-xmark');
        minCapIcon.classList.add('fa-circle-check');
        minCapIcon.style.fontWeight = "bold";
    } else {
        minCapIcon.classList.remove('fa-circle-check');
        minCapIcon.classList.add('fa-circle-xmark');
        minCapIcon.style.fontWeight = "normal";
    }
}

confirmPasswordInputElement.onkeyup = function (){

    if(passwordInputElement.value === this.value){
        passwordMatch.classList.remove('fa-circle-xmark');
        passwordMatch.classList.add('fa-circle-check');
        passwordMatch.style.fontWeight = "bold";
    } else {
        passwordMatch.classList.remove('fa-circle-check');
        passwordMatch.classList.add('fa-circle-xmark');
        passwordMatch.style.fontWeight = "normal";
    }
}



