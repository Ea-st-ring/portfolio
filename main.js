'use strict'

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
console.log(navbarHeight);
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    } // navbar에 undefined 가 뜨는 부분을 없애주는 작업
    scrollIntoView(link);
});


// Handle click on Contact me button on home
const contactBtn = document.querySelector('.profile__contactBtn');
contactBtn.addEventListener('click', () => {
    scrollIntoView('#Contact');
});





// TransparentHome as scrolling
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
console.log(homeHeight);
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});


// Show arrow up button when scrolling down

const upBtn = document.querySelector('.upBtn');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        upBtn.classList.add('active');
        upBtn.style.opacity = 1;
    } else {
        upBtn.classList.remove('active');
        upBtn.style.opacity = 0;
    }
});

upBtn.addEventListener('click', () => {
    setTimeout(BtnCall, 1.0 * 1000); // 해결해야함....

})









function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}