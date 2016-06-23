// // Causes parallax scrolling to be more dramatic and noticable
// // Need to readjust CSS properties =>
// (remove html/body overflow: hidden and #wrapper overflow: auto)
// // NOT AN IDEAL SOLUTION WOULD NOT RECOMMEND
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

$(function(){

  // --------------------------------------------
  //              VARIABLES DECLARED
  // --------------------------------------------

  var $selectAll = $('#select-all');
  var $selectBox = $('.select-box');
  var i;
  var findout_options = ['Word of mouth','Radio','TV','Print','Outdoor','Social Media','From a Friend','Advertisement'];
  var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  var month_names = ['January','February','March','April','May','June','July','August','September','October','November','December', ];

  var $dropdownToggle = $('.dropdown-toggle');

  // --------------------------------------------
  //              DOM MANIPULATION
  // --------------------------------------------

  // populate FIND-OUT <select> node
  populateSelectNode($('#find-out'), findout_options);

  // populate COUNTRIES <select> node
  populateSelectNode($('#countries'), country_list);

  // populate BIRTHDATE <select> node
  // years <select> node
  for (i = new Date().getFullYear(); i > 1900; i--){
    $('#years').append($('<option />').val(i).html(i));
  }
  // months <select> node
  for (i = 1; i < 13; i++){
    $('#months').append($('<option />').val(i).html(month_names[i-1]));
  }
  // Days <select> node
  updateNumberOfDays();

  // --------------------------------------------
  //              EVENT LISTENERS
  // --------------------------------------------

  $('#years, #months').on('change', function(){
    updateNumberOfDays();
  });

  $selectAll.on('change', function() {
    changeSelected($selectBox, $selectAll);
  })

  // IMPORTANT populate the Character Count div (mceu_charCount) div inside tinymce status bar
  $(window).on('load', function() {
    $("#mceu_2-body").append('<div id="mceu_charCount"></div>');
  })

  // Tab handler in my-community
  $(window).on('load', function() {
    $('a[data-tabName="followers"').addClass('tabActive');
    var tabId = '#followers';
    $(tabId).css('display', 'block');
  })

  $('a[data-tabName]').on('click', function(e) {
    e.preventDefault();
    var tabId = '#' + $(this).attr('data-tabName');

    $('.community').css('display', 'none');
    $('.tablink').removeClass('tabActive');

    $(tabId).css('display', 'block');
    $(this).addClass('tabActive');
  })

  // Accordion search refiner handler
  $('.accordion').on('click', function() {
    // restrict only ONE tab open, remove this f(n) to allow multiple tabs open
    $('.accordion').not(this).each(function() {
      $(this).removeClass('active');
      $(this).next().removeClass('show');
    })

    $(this).toggleClass('active');
    $(this).next().toggleClass('show');
  })

  // // Rating hearts handler, properly displays the # of hearts that should light up
  // $('.fa.fa-heart').on('click', function() {
  //   var self = $(this);
  //   self.toggleClass('liked');

  //   if ( self.next().hasClass('liked') ) {
  //     self.nextAll().removeClass('liked');
  //     self.addClass('liked');
  //   } else {
  //     $(this).prevAll().each(function() {
  //       self.hasClass('liked') ? $(this).addClass('liked') : $(this).removeClass('liked');
  //     })
  //   }
  // })

  // Only 1 checkbox with similar value allowed to be checked
  $('.product-filter input[type="checkbox"]').on('change', function() {
    $('.product-filter input[type="checkbox"][value=' + $(this).val() + ']').not(this).prop('checked', false);
  });

  // Shop option button listener
  $('#shop-option-button').on('click', function() {
    $('.product-shop-options').toggleClass('shop-show');
  })

  $('#shop-close').on('click', function() {
    $('.product-shop-options').removeClass('shop-show');
  })

  // Mobile Navigation Menu listener
  $('.dropdown-menu li a').on('click', function(e) {
    if (!$(this).parent().hasClass('dropdown-submenu')) {
      e.preventDefault();
      e.stopPropagation();
    }

    $(this).next().toggleClass('dropdown-submenu-show');

    if ($(this).children().hasClass('fa-chevron-down')) {
      $(this).children().removeClass('fa-chevron-down');
      $(this).children().addClass('fa-chevron-up')
    } else if ($(this).children().hasClass('fa-chevron-up')) {
      $(this).children().removeClass('fa-chevron-up');
      $(this).children().addClass('fa-chevron-down')
    }

    $(this).toggleClass('dropdownActive');

  })

  $dropdownToggle.on('click', function(e) {

    if ($(window).width() <= 769) {

      if ($(this).hasClass('dropdownActive')) {
        $(this).removeClass('dropdownActive')
        $(this).children().not('.fa-wrench').addClass('fa-chevron-down')
        $(this).children().removeClass('fa-chevron-up');
      } else if (!$(this).hasClass('dropdownActive')) {
        $dropdownToggle.removeClass('dropdownActive');
        $(this).addClass('dropdownActive');
        $(this).children().not('.fa-wrench').addClass('fa-chevron-up');
        $(this).children().removeClass('fa-chevron-down');
      }

      $dropdownToggle.children('.fa-chevron-up').each(function() {
        if ( !$(this).parent().hasClass('dropdownActive') ) {
          $(this).removeClass('fa-chevron-up');
          $(this).addClass('fa-chevron-down');
        }
      })
    }
  })

  $('#home-wrapper').on('click', function() {
    if ( $(window).width() <= 769 ) {
      $('.navbar-collapse.collapse').removeClass('in');
      $dropdownToggle.removeClass('dropdownActive');
      $dropdownToggle.children().removeClass('fa-chevron-up');
      $dropdownToggle.children().addClass('fa-chevron-down');
    }
  })

  if ( $(window).width() > 769 ) {
    $dropdownToggle.addClass('disabled');
  }

  $(window).on('resize', function() {
    if ( $(window).width() > 769 && !$dropdownToggle.hasClass('disabled') ) {
      $dropdownToggle.addClass('disabled');
    } else if ( $(window).width() <= 769 && $dropdownToggle.hasClass('disabled') ) {
      $dropdownToggle.removeClass('disabled');
    }
  })


  // --------------------------------------------
  //      INITIALIZING JAVASCRIPT PACKAGES
  // --------------------------------------------
  // 1. Slick.js
  // 2. TinyMCE

  // Used in home page -> index.html
  $('.slider-carousel').slick({
    prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    dots: true,
  });

  // Used in multiple pages -> contact-us.html, write-review.html, edit-profile.html
  // Not loaded on every page, do check tinymce.js is loaded into that page
  // not necessary if gulped into one js file
  if (window.tinymce && window.tinyMCE) {
    tinymce.init({
      selector: 'textarea',
      toolbar: false,
      menubar: false,
      theme: 'modern',
      browser_spellcheck: true,

      setup: function (ed) {
        ed.on('keyup', function (e) {
          var count = countCharacters();
          $("#mceu_charCount").html(
            "<p id='character_count'>Characters: "
            + count
            + "</p><div class='clearfix'></div>"
          );
        });
      },
    });
  }

});

// --------------------------------------------
//               UTILITY FUNCTIONS
// --------------------------------------------

// Changes all PRIVACY OPTIONS to the selected value from the dropdown menu
function changeSelected(target, value) {
  target.val(value.val());
}

//function to update the days based on the current values of month and year
function updateNumberOfDays(){
  $('#days').html('<option value="">Day</option>');
  month = $('#months').val();
  year = $('#years').val();
  days = daysInMonth(month, year);

  for(i=1; i < days+1 ; i++){
    $('#days').append($('<option />').val(i).html(i));
  }
}

// New date object with correct days in month
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// Populates select DOM nodes with <options />
function populateSelectNode($domObj, arrayData) {
  for (i = 0; i < arrayData.length; i++) {
    $domObj.append($('<option />').val(i).html(arrayData[i]));
  }
}

// Get value of textarea, trims white space, return the length
function countCharacters() {
  var body = tinymce.get("contact-us-textarea").getBody();
  var content = tinymce.trim(body.innerText || body.textContent);
  return content.length;
};

function validateCharacterLength() {
  var min = 20;
  var max = 1000;
  var count = countCharacters();
  if (count > max) {
    alert("Maximum " + max + " characters allowed.")
    return false;
  } else if (count < min) {
    alert("Minimum " + min + " characters allowed.")
    return false
  }
  return;
}
