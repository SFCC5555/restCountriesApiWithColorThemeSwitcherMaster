let backButton = document.getElementById('backButton');

backButton.addEventListener('click',backMainPage);

function backMainPage() {

    window.location.pathname='./index.html'

}

let darkModeButton=document.getElementById('darkModeButton');
let body=document.querySelector('body');
let elements=document.querySelectorAll('.lightModeElements');
let darkModeIcon=document.getElementById('darkModeIcon');
let backArrow=document.getElementById('backArrow');

console.log(elements)
darkModeButton.addEventListener('click',darkModeSwitch);


function darkModeSwitch() {

    body.classList.toggle('ligthModeBackground');
    body.classList.toggle('darkModeBackground');

    darkModeIcon.classList.toggle('darkModeIconLight');
    darkModeIcon.classList.toggle('darkModeIconDark');

    backArrow.classList.toggle('backArrowLight');
    backArrow.classList.toggle('backArrowDark');

    for (let l of elements) {
        l.classList.toggle('lightModeElements');
        l.classList.toggle('darkModeElements');
    }
} 

