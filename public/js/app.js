// // Causes parallax scrolling to be more dramatic and noticable
// // Need to readjust CSS properties (html/body overflow: hidden and overflow: auto values)
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

// UTILITY FUNCTIONS
// Changes all PRIVACY OPTIONS to the selected value from the dropdown menu
function changeSelected(target, value) {
  target.val(value.val());
}

$(function(){
  // VARIABLES DECLARED HERE
  var $selectAll = $('#select-all');
  var $selectBox = $('.select-box');

  // EVENT EMITTERS
  $selectAll.on('change', function() {
    changeSelected($selectBox, $selectAll);
  })

  // ACTIVATING SLIDER
  $('.slider-carousel').slick({
    prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    dots: true,
  });

});
