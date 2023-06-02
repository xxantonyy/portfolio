'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tanContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');


///////////////////////////////////////
// Modal window

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow))

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});



btnScrollTo.addEventListener('click', function(e){
  // const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Текущее прокручивание: x , y', window.pageXOffset, window.pageYOffset);
  // console.log('Ширина и высота viewport', document.documentElement.clientWidth, document.documentElement.clientHeight);

  // window.scrollTo(section1Coords.left + window.pageXOffset, section1Coords.top + window.pageYOffset);

  // window.scrollTo({ 
  //   left: section1Coords.left + window.pageXOffset, 
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth'});
});

//////////////////////////////////////
                        // Плавная навигациы по странице


// document.querySelectorAll('.nav__link').forEach( function(htmlElem) {
//   htmlElem.addEventListener('click', function (e){
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth'});
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function(e)
{
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth'});
  }
});


                         // Вкладки


tanContainer.addEventListener('click', function(e) {
  const clickButton = e.target.closest('.operations__tab');
  if(!clickButton) return

                        //Активная вкладка
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  clickButton.classList.add('operations__tab--active');

                       //Активный контент
  tabContents.forEach(tab=>tab.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clickButton.dataset.tab}`).classList.add('operations__content--active');
});

                    //Анимация потускнения на панели анимации

const navLinksOverAnimation = function (e) {
  if(e.target.classList.contains('nav__link')){
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    
    siblingLinks.forEach(el => {
      if(el !== linkOver) el.style.opacity = this;
    })
    logo.style.opacity = this;
    logoText.style.opacity = this;
  };

};

nav.addEventListener('mouseover', navLinksOverAnimation.bind(0.4));
nav.addEventListener('mouseout', navLinksOverAnimation.bind(1));

                             // Sticky navigatioin

// const section1Cords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(e){
//   if(this.window.scrollY > section1Cords.top){
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

                        // Stickty navigation - Intersectoin Observer API

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };
// const observer = new IntersectionObserver(observerCallback,observerOptions);
// observer.observe(section1);

const getStickyNav = function(entries){
  const entry = entries[0];
  if(!entry.isIntersecting){
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);


                           // Появление разделов(секций) сайта

const allSections = document.querySelectorAll('.section')

const appearenceSection = function(enrties,observer){
  const entry = enrties[0];
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(appearenceSection,{
  root: null,
  threshold: 0.25,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
  

// Имплеминтация ленивой загрузки изображений
const loadImages = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Меняем изображение на изображение с высоким разрешением
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImages = document.querySelectorAll('img[data-src]');

const lazyImagesObserver = new IntersectionObserver(loadImages,{
  root: null,
  threshold:0.7,
});
lazyImages.forEach(image=>lazyImagesObserver.observe(image));

                      // Создание слайдера
let currentSlide = 0;

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight =document.querySelector('.slider__btn--right');
const slidersNumber = slides.length;
const dotContainer = document.querySelector('.dots');

// const slider= document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(1300px)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const dotActive = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};


const moveToSlide = function(slide) {
  slides.forEach((s,index)=> s.style.transform = `translateX(${(index-slide)*100}%)`);
};
moveToSlide(0);

const nextSlide = function() {
  if(currentSlide === slidersNumber -1){
    currentSlide = 0;
  } else {
    currentSlide++
  }
  moveToSlide(currentSlide);
  dotActive(currentSlide);
};
const previousSlide = function() {
  if(currentSlide === 0){
    currentSlide = slidersNumber - 1;
  } else {
    currentSlide--;
  };
  moveToSlide(currentSlide);
  dotActive(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')){
    const slideDot = e.target.dataset.slide;
    moveToSlide(slideDot);
    dotActive(slideDot);
  };
});



////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////





// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);


// console.log(document.querySelector('.header'));
// const section = document.querySelectorAll('.section');
// console.log(section);

// console.log(document.getElementsByTagName('button'));


// //////////////////////////////////

// const messege = document.createElement('div');

// messege.classList.add('cookie-message');

// // messege.textContent('Мы используем куки для улучшения ресурса');

// messege.innerHTML = 'Мы используем куки для улучшения ресурса. <button class="btn btn--close-cookie">Ок!</button> ';

// const header = document.querySelector('.header');
// header.prepend(messege);
// document.querySelector('.btn--close-cookie').addEventListener('click',function () {
//       messege.remove();
// });

// // Стили

// messege.style.backgroundColor = '#FF8C00'
// messege.style.width = '120%';

// console.log(getComputedStyle(messege).color);

// messege.style.height = Number.parseFloat(getComputedStyle(messege).height) +50 + 'px';

// document.documentElement.style.setProperty('--color-first', 'LightSeaGreen');

// ///   Атртбуты 

// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.getAttribute('src'));
// logo.setAttribute('creator', 'Atnon Bog');
// console.log(logo.getAttribute('creator'));

// const link = document.querySelector('.masters-of-code-link');
// console.log(link.href);

// /// Data Атрибуты 

// console.log(logo.dataset);

// const h1 = document.querySelector('h1');
// const alertMousEnter = function(e) {
//   alert('addEventListener: Вы навели на элемент h1')
//   };

// h1.addEventListener('mouseenter', alertMousEnter);

// setTimeout(() => h1.removeEventListener('mouseenter', alertMousEnter), 3 *1000);

/////////////////////

// Event Propogation 

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// };

// const getRandomColor = () => `rgb(${getRandomIntInclusive(0,255)},${getRandomIntInclusive(0,255)},${getRandomIntInclusive(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = getRandomColor();
//   console.log('link', e.currentTarget);
//   console.log(this === e.currentTarget);
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = getRandomColor();
//   console.log('links', e.currentTarget);
// });              
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = getRandomColor();
//   console.log('nav', e.currentTarget);
// }
// // , true
// );
// document.querySelector('body').addEventListener('click',function(e){
//   this.style.backgroundColor = getRandomColor();
//   console.log('body', e.currentTarget);
// });

////////////////////////////////////////////////////////////

////           DOm taversing (перемещение по DO)

// const h1 = document.querySelector('h1');

// // Перемещение вниз к потомкам

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'yellow'
// h1.lastElementChild.style.color = 'green'

// // Перемещение вверх к родителям

// console.log(h1.parentNode);
// console.log(h1.parentElement);


// const h2 = document.querySelector('h2');
// console.log(h2)
// h2.closest('.section').style.backgroundColor = 'blue';


//                        Lifecycle DOM Events

document.addEventListener('DOMContentLoaded', function(e) {
  console.log('Дерево DOM создано',e)
});
window.addEventListener('load', function(e){
  console.log('Страница загружена',e);
});
// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault();
//   console.log('Вы уверенны что хотите закрыть браузер?')
//   e.returnValue = '';
// });