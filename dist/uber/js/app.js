let dot = document.querySelector('.city_dot');
let icons = document.querySelectorAll('.cercls');

icons.forEach(itr => {

   itr.addEventListener('mouseover', function() {
      itr.classList.add('fa-bounce')
   })
   itr.addEventListener('mouseout', function() {
      itr.classList.remove('fa-bounce')
   })
})



// setInterval(function(){
//    dot.classList.remove('active')
//    setTimeout(function() {
//       dot.classList.add('active');
//    },1*1000)
// }, 2*1000)


window.addEventListener('scroll', function() {
   var navbar = document.querySelector('.navbar');
   var scrollPosition = window.scrollY;
 
   if (scrollPosition > 400) { /* Замените 100 на нужное вам значение */
     navbar.classList.add('navbar_fixed');
   } else {
     navbar.classList.remove('navbar_fixed');
   }
 });


 window.addEventListener('DOMContentLoaded', () => {
   const menu = document.querySelector('.menu'),
   menuItem = document.querySelectorAll('.menu_item'),
   hamburger = document.querySelector('.hamburger');

   hamburger.addEventListener('click', () => {
       hamburger.classList.toggle('hamburger_active');
       menu.classList.toggle('menu_active');
   });

   menuItem.forEach(item => {
       item.addEventListener('click', () => {
           hamburger.classList.toggle('hamburger_active');
           menu.classList.toggle('menu_active');
       })
   })
})