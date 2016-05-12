// // Causes parallax scrolling to be more dramatic and noticable
// // Need to readjust CSS properties (html/body overflow: hidden and overflow: auto values)
// // NOT AN IDEAL SOLUTION
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
  // VARIABLES DECLARED
  // ==========================
  var $selectAll = $('#select-all');
  var $selectBox = $('.select-box');
  var i;

  // populate FIND-OUT select box
  var findout_options = ['Word of mouth','Radio','TV','Print','Outdoor','Social Media','From a Friend','Advertisement'];
  populateSelectNode($('#find-out'), findout_options);

  // populate COUNTRIES select box
  var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  populateSelectNode($('#countries'), country_list);

  // populate BIRTHDATE select box
  var month_names = ['January','February','March','April','May','June','July','August','September','October','November','December', ];

  // populate years select box
  for (i = new Date().getFullYear(); i > 1900; i--){
    $('#years').append($('<option />').val(i).html(i));
  }
  // populate months select box
  for (i = 1; i < 13; i++){
    $('#months').append($('<option />').val(i).html(month_names[i-1]));
  }
  // populate Days select box
  updateNumberOfDays();

  // EVENT LISTENERS
  // ==========================
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

  // Tab handler in my-community.js
  $('a[data-tabName').on('click', function() {
    var tabId = '#' + $(this).attr('data-tabName');

    $('.community').css('display', 'none');
    $('.tablink').removeClass('tabActive');

    $(tabId).css('display', 'block');
    $(this).addClass('tabActive');
  })

  $('.accordion').on('click', function() {
    $(this).toggleClass('active');
    $(this).next().toggleClass('show');
  })

  // INITIALIZING JAVASCRIPT PACKAGES
  // ==========================
  // 1. Slick.js
  // 2. TinyMCE

  // Used in home page -> index.html
  $('.slider-carousel').slick({
    prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    dots: true,
  });

  // Used in multiple pages -> contact-us.html, write-review.html, edit-profile.html
  // So therefore, do a check first if tinymce.js is loaded into that page
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
          var count = CountCharacters();
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


// UTILITY FUNCTIONS
// ==========================

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
function CountCharacters() {
  var body = tinymce.get("contact-us-textarea").getBody();
  var content = tinymce.trim(body.innerText || body.textContent);
  return content.length;
};

function ValidateCharacterLength() {
  var min = 20;
  var max = 1000;
  var count = CountCharacters();
  if (count > max) {
    alert("Maximum " + max + " characters allowed.")
    return false;
  } else if (count < min) {
    alert("Minimum " + min + " characters allowed.")
    return false
  }
  return;
}
