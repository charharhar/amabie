// $(function() {

//   var $window = $(window);
//   var $wrapper = $('#home-wrapper');
//   $wrapper.css({'height': ($wrapper.height() - 458.857) + 'px'});

//   $('section[data-type="background"]').each(function() {
//     var $bgobj = $(this);

//     $window.scroll(function() {
//       var yPos = -($window.scrollTop() / $bgobj.data('speed'));
//       var coords = yPos + 'px';
//       $('#home-wrapper .container').css({ transform: 'translateY(' + yPos*4 + 'px)' });
//     }) // end window scroll
//   })
// })

$(document).ready(function(){
  $('.slider-carousel').slick({
    prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    dots: true,
  });
});
