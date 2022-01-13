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
const navbarMenuItems = document.querySelectorAll(".navbar__menu__item");
console.log(navbarMenuItems[1].dataset.link);
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    } // navbar에 undefined 가 뜨는 부분을 없애주는 작업
    navbarMenu.classList.remove('active');
    scrollIntoView(link);

    navbarMenuItems.forEach((element) => {
            if (link === element.dataset.link) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }) // focus on button

    // 스크롤 시 focus 가 넘어가는 것 만들기!!

});

// navbar Menu Scroll
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

// const about = document.querySelector('#about');
// const skills = document.querySelector('#skills');
// const myWork = document.querySelector('#MyWork');
// const testimonials = document.querySelector('#Testimonials');
// const contact = document.querySelector('#Contact');

// const aboutHeight = about.getBoundingClientRect().height;
// const skillsHeight = skills.getBoundingClientRect().height;
// const myWorkHeight = myWork.getBoundingClientRect().height;
// const testiHeight = testimonials.getBoundingClientRect().height;
// const contactHeight = contact.getBoundingClientRect().height;

// const Heights = [homeHeight, aboutHeight, skillsHeight, myWorkHeight, testiHeight, contactHeight];

// Heights[1] += homeHeight;
// Heights[2] += Heights[1];
// Heights[3] += Heights[2];
// Heights[4] += Heights[3];
// Heights[5] += Heights[4];
// console.log(Heights);
// console.log(window.scrollY);


// function scrollFocus(heightY, number) {
//     document.addEventListener('scroll', () => {
//         navbarMenuItems.forEach((element) => {
//             if (number > 0) {
//                 if (navbarMenuItems[number - 1] < window.scrollY || window.scrollY < heightY) {
//                     navbarMenuItems[number].classList.add('active');
//                 } else {
//                     element.classList.remove('active');
//                 }
//             } else { navbarMenuItems[0].classList.add('active'); }

//         });
//     })
// };

// scrollFocus(aboutHeight, 1);
// scrollFocus(skillsHeight, 2);
// scrollFocus(myWorkHeight, 3);
// scrollFocus(testiHeight, 4);
// scrollFocus(contactHeight, 5);






// Handle click on Contact me button on home
const contactBtn = document.querySelector('.profile__contactBtn');
contactBtn.addEventListener('click', () => {
    scrollIntoView('#Contact');
});





// TransparentHome as scrolling
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
    setTimeout(() => { scrollIntoView('#home') }, 250);
});



// project button

const categoryBtn = document.querySelectorAll(".category__btn");


clickProject(0);
clickProject(1);
clickProject(2);
clickProject(3);


const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".work__projects");




// toggle button
console.log(navbarMenu.classList);
const toggleBtn = document.querySelector('.navbar__toggle-btn');


toggleBtn.addEventListener('click', () => {
    const activeCondition = !navbarMenu.classList.contains('active');
    const navbardark = navbar.classList.contains('navbar--dark');
    console.log(navbardark);
    if (activeCondition) {
        navbarMenu.classList.add('active');
    } else {
        navbarMenu.classList.remove('active');
    }
});

















// functions

function viewProject(number, name) {
    let i = 0;
    let j = 0;
    for (i = 0; i < 8; i++) {

        if (name == "all") {
            for (j = 0; j < 8; j++) {
                projects[j].style.display = 'block';
            }
        } else if (name != projects[i].dataset.category) {
            projects[i].style.display = "none";
        } else if (name == projects[i].dataset.category) {
            projects[i].style.display = "block";
        }
    }
};



function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}


function clickProject(number) {
    categoryBtn[number].addEventListener('click', (event) => {
        projectContainer.classList.add('anim-out');
        setTimeout(() => {
            projectContainer.classList.remove('anim-out');


            let i = 0;
            const target = event.target;
            const categoryname = target.dataset.category || target.parentNode.dataset.category;
            // dataset 안에 category 가 없으면 parentNode 에서 접근!!
            categoryBtn[number].classList.add('active');
            for (i = 0; i < 4; i++) {
                if (i != number) {
                    categoryBtn[i].classList.remove('active');
                }
            }
            viewProject(number, categoryname);
        }, 300); // 제거하지 않을 경우 anim-out 이 계속 실행되어 opacity를 0으로 만듦
    })
};