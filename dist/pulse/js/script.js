const btn2 = document.querySelectorAll('.catalog-item__back-link');
const btn1 = document.querySelectorAll('.catalog-item__link');
const wrapper = document.querySelector('.catalog-item__wrapper');
const footer = document.querySelector('.catalog-item__list');
const callButton = document.querySelectorAll('.button__call');
const buyBtn = document.querySelectorAll('.button_mini');
const btnSubmit = document.querySelector('.button_submit');
const overlay = document.querySelectorAll('.overlay');

         // Скрипт для Слайдера
$(document).ready(function(){
   $('.carusel__inner').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      // adaptiveHeight: true,
      prevArrow : '<button type="button" class="slick-prev"><img src="img/slider-left.png"></img></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/slider-right.png"></img></button>',
      responsive: [
         {
            breakpoint: 1000,
            settings: {
              arrows: false
            }
          },
      ]
      });
 });

  // функция свапа Классов
const swapper = function (e,firstSwap,secondSwap) {
   e.parentElement.querySelector(firstSwap).classList.toggle('catalog-item__diasble');
   e.parentElement.querySelector(secondSwap).classList.toggle('catalog-item__diasble');
}
btn1.forEach(function(e){
   e.addEventListener('click', function(ee) {
      ee.preventDefault();
      const wrapper = ee.target.closest('.catalog-item__wrapper');
      swapper(wrapper,'.catalog-item__wrapper','.catalog-item__list');
   });
});

btn2.forEach(function(e){
   e.addEventListener('click', function(ee) {
      ee.preventDefault();
      const list = ee.target.closest('.catalog-item__list');
      swapper(list,'.catalog-item__wrapper','.catalog-item__list');
   });
})

const object = document.querySelectorAll('.revivers__item');

   // Функция длдя показа коментариев при прокрутке до них
function showObjects() {
  for (let i = 0; i < object.length; i++) {
    const objectPosition = object[i].getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (objectPosition < screenPosition) {
      object[i].classList.add('revivers-show');
    }
    if (objectPosition > screenPosition*1.25) {
      object[i].classList.remove('revivers-show');
    }
  }
}

window.addEventListener('scroll', showObjects);

const validateForm = function(form) {
   $('input[name=phone]').mask("+7 (999) 999-9999");
   $(form).validate({
      rules: {
         name: {
            required: true,
         },
         phone: {
            required: true,
         },
         email: {
            required: true,
            email: true
         }
      },
      messages: {
         name: "Введите имя",
         phone: "Введите телефон",
         email: {
            email: "Введите коректный адрес",
            required: "Пожалуйста введите свою почту"
         }
       }
   });
};

const hiddenBtn = function (parents) {
   const parent = document.querySelector(parents);
   parent.classList.remove('hidden');
   const btn__close = parent.querySelector('.modal__close');
   const validation = parent.querySelector('.feed-form');
   validateForm(validation);
   const overlay = parent.closest('.overlay')
   
   btn__close.addEventListener('click',function(){
      parent.classList.add('hidden');
   })
   overlay.addEventListener('click',function(e){
      if(e.target.className === "overlay") {
         parent.classList.add('hidden')
      }
   })
}

callButton.forEach(function(e) {
   e.addEventListener('click', function(btn){
      hiddenBtn('#cousultation');
   })
})

buyBtn.forEach(function(e){
   e.addEventListener('click', function(btn){
      hiddenBtn('#order');
      const parent = document.querySelector('#order');
      const model = parent.querySelector('.modal__descr');
      const orderFeedForm = parent.querySelector('.feedForm')
      validateForm(orderFeedForm);
      const paren_modele = btn.target.closest('.catalog-item')
      const model_type = paren_modele.querySelector('.catalog-item__subtitle').textContent;
      model.textContent = model_type;
   })
})

btnSubmit.addEventListener('click', function(e){
   const fForm = e.target.closest('.feed-form');
   validateForm(fForm);
})

$('form').submit(function(e){
   e.preventDefault();
   if(!$(this).valid()) return;

   $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
   }).done(function(){
      $(this).find("input").val("");
      $('#cousultation, #order, .overlay').fadeOut();
      $('#accept').fadeIn('slow');
      $('form').trigger('reset');
      setTimeout(function(){
         $('#accept, #cousultation,  .overlay').fadeOut();
         overlay.forEach(function(e){
            e.classList.add('hidden')
         })
      },3000)
      
   });
   return false;
})


// получаем элемент секции, после которой должна появляться картинка
let section = document.getElementById('for_up');

// добавляем обработчик события scroll на страницу
window.addEventListener('scroll', function() {
  // получаем координаты секции относительно видимой области страницы
  let sectionCoords = section.getBoundingClientRect();

  // если верхняя граница секции находится выше или на уровне нижней границы видимой области страницы
  if (sectionCoords.top <= window.innerHeight) {
    // добавляем картинку на страницу
    let img = document.getElementById('for_down');
    $(img).fadeIn();
  }

  if (sectionCoords.top > window.innerHeight) {
   // добавляем картинку на страницу
   let img = document.getElementById('for_down');
   $(img).fadeOut();
 }
});

function showObjects2() {
   for (let i = 0; i < object.length; i++) {
     const objectPosition = object[i].getBoundingClientRect().top;
     const screenPosition = window.innerHeight / 1.5;
 
     if (objectPosition < screenPosition +100) {
       object[i].classList.add('.title');
     }
   }
 }