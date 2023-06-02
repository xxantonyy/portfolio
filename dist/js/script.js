const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('#menu');
const closeBtn = menu.querySelector('.menu__close');
const sshkalaLoading = document.querySelectorAll('.sshkala__loading');
const sshkalaLoading_item = document.querySelectorAll('.skills__item');
const meniList = document.querySelectorAll('.menu__list');
const btn = document.querySelector('.btn__send');


hamburger.addEventListener('click', function() {
   menu.classList.add('active');
})
closeBtn.addEventListener('click', function() {
   menu.classList.remove('active');
})

const  typed = new Typed('#typed', {
  strings: ['Я web-разработчик из города Москва','Я не придумал что еще написать...','Вы еще тут?'],
  typeSpeed: 60,
  backSpeed: 30,
  startDelay: 900,
  loop: true,
  showCursor: false,
});

sshkalaLoading_item.forEach(function(e){
   e.addEventListener('mouseover', function(e){
      if(e.target.classList.value === 'skills__item') 
      {
         let loading = e.target.querySelector('.sshkala__loading');
         let percent = e.target.querySelector('.percent');
         if(percent.textContent == '0%') {
            let i =0;
           const interval = setInterval(function(){
               loading.style.width = i +'%';
               percent.textContent= i +'%';
               i++;
               if(percent.textContent == percent.dataset.target) {
                  clearInterval(interval);
               }
            },50)
         } 
      } else return
   })
})

window.addEventListener('scroll', function() {
   var blocks = document.querySelectorAll('.animate__animated');
   for (var i = 0; i < blocks.length; i++) {
       var position = blocks[i].getBoundingClientRect().top;
       var windowHeight = window.innerHeight;
       if (position < windowHeight - 200) {
           blocks[i].classList.add('animate__slideInRight');
           blocks[i].style.opacity = 100;
       }
   }
});

$(function(){
   $('form').submit(function(e){
   
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function(){
         alert('Отправлено!');
         $(this).find("input").val("");
      });
      return false;
   })
 });

 meniList.forEach(function(e){
   e.addEventListener('click',function(ee){
      menu.classList.toggle('active');
   })
 })