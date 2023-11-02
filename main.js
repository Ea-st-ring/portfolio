'use strict'


const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
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
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    } // navbar에 undefined 가 뜨는 부분을 없애주는 작업
    navbarMenu.classList.remove('active');
    scrollIntoView(link);

    // Focus on Button when we click

    navbarMenuItems.forEach((element) => {
            if (link === element.dataset.link) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }) // focus on button
});

// 1. 모든 섹션 요소를 가져옴
// 2. IntersectionObserver 를 이용해 모든 섹션 관찰
// 3. 보여지는 섹션의 메뉴 아이템 활성화

// Focus on button when we scroll

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};


const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // 스크롤링이 아래로 되어 페이지가 올라옴
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

let values = document.querySelectorAll('.skill__value'); // skill-bar 애니메이션 이벤트
const observer2 = new IntersectionObserver((e)=>{
    e.forEach((div =>{
        if(div.isIntersecting){
            values.forEach((target)=>{          
                target.style.width = target.dataset.value; 
            });
        } else {
        values.forEach((target)=>{
            target.style.width = "0%";
        });
    } 
    }));
    },observerOptions);

observer2.observe(sections[2].childNodes[1]);

window.addEventListener('resize', () => {
    if (document.body.clientWidth < 760) {
        sections.forEach(section => observer.unobserve(section));
    } else {
        sections.forEach(section => observer.observe(section));
    }
}); // 일정 픽셀 이하에서 Scroll focus 관련하여 오류가 있기 때문에 비활성화



window.addEventListener('wheel', () => { // wheel 은 마우스
    if (document.body.clientWidth > 760) {
        if (window.scrollY === 0) {
            selectedNavIndex = 0;
        } else if (
            Math.round(window.scrollY + window.innerHeight) >=
            document.body.clientHeight) {
            selectedNavIndex = navItems.length - 1;
        }
        selectNavItem(navItems[selectedNavIndex]);
        // select home and contact when page's top & down 
    }
});




// Handle click on Contact me button on home
const contactBtn = document.querySelector('.profile__contactBtn');
contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});





// TransparentHome as scrolling
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
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
    setTimeout(() => { 
        scrollIntoView('#home');
        upBtn.style.animation = 'upBtn_anim 1s'; 
    }, 250);
    setTimeout(() => { upBtn.style.animation = ''; }, 1000);
});



// project button

const categoryBtn = document.querySelectorAll(".category__btn");


clickProject(0);
clickProject(1);
clickProject(2);



const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".work__projects");


// toggle button
const toggleBtn = document.querySelector('.navbar__toggle-btn');

toggleBtn.addEventListener('click', () => {
    const activeCondition = !navbarMenu.classList.contains('active');
    const navbardark = navbar.classList.contains('navbar--dark');
    if (activeCondition) {
        navbarMenu.classList.add('active');
        navbarMenuItems.forEach((element) => {
            element.classList.remove('active');
        });
    } else {
        navbarMenu.classList.remove('active');
    } 
});
const profileImg = document.querySelector('.profile__img');

window.addEventListener('load',()=>{
    setTimeout(() => {
        profileImg.classList.add('active');
    },2000);
});

// let windowWidth = window.matchMedia('screen and (max-width:768px)');
// projectContainer.addEventListener('click',(e)=>{
    
//     if(windowWidth.matches){
//         activeCheck(e);
//     }
// });


// function activeCheck(item){
//     if(item.target.attributes.active){
//         item.target.classList.remove('after');
//         item.target.removeAttribute('active');
        
//     } else{
//         item.preventDefault();
//         item.target.classList.add('after');
//         item.target.setAttribute('active','true');
//     }
// }

const profileGreet = document.querySelector('.profile__greet');
const profileDesc = document.querySelector('.profile__description');

addChar(profileGreet.attributes.text.value, profileGreet, 600);
addChar(profileDesc.attributes.text.value, profileDesc, 400);


// functions

function addChar(text, target, sec){
    let chars = [];
    for (let i = 0; i < text.length; i++) {
        chars.push({
        char: text[i],
        key: i,
        });
    }
    chars.map((char) => {
        setTimeout(() => {
        target.innerHTML += char.char;
        }, sec + char.key * 60);
    });
}

function viewProject(number, name) {
    let i = 0;
    let j = 0;
    for (i = 0; i < 4; i++) {

        if (name == "all") {
            for (j = 0; j < 4; j++) {
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
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
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
            for (i = 0; i < 3; i++) {
                if (i != number) {
                    categoryBtn[i].classList.remove('active');
                }
            }
            viewProject(number, categoryname);
        }, 300); // 제거하지 않을 경우 anim-out 이 계속 실행되어 opacity를 0으로 만듦
    })
};



function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}