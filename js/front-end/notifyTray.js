$(document).ready(function() {
   if (getParameterByName('disableISIFooter') == 'true') {
      console.log("DISABLED: Sticky ISI Footer");
      $('.notifyTray').removeClass('is-sticky');
   } else {
      var placeholder = $('<div id="safteyInformation" class="js-notifyTrayPLaceholder"></div>');
      var toggleText = $('.notifyTray-toggleLink').text();

      $('.notifyTray').before(placeholder);

      $('.notifyTray-toggleLink').click(function() {
         var headerUtilHeight = parseInt($('.headerMain-util').outerHeight());
         var headerMainHeight = parseInt($('.headerMain-main').outerHeight());
         var notifyHeight = parseInt($('.notifyMain').outerHeight());
         var visibleHeader = getVisible('.headerMain-util') + getVisible('.headerMain-main') + getVisible('.notifyMain');

         var windowHeight = $(window).outerHeight();
         if ($('.notifyTray').hasClass('full')) {
            $('body').removeClass('noScroll');
            $('.notifyTray').removeClass('full').css('height', '');
            $(this).text(toggleText)
         } else {
            $('body').addClass('noScroll');
            $('.notifyTray').addClass('full').css('height', (windowHeight - visibleHeader) + 'px');
            $(this).text('Close');
         }
      });
      $(window).scroll();
      $(window).scroll(function() {
         if (isScrolledIntoView('.js-notifyTrayPLaceholder', 170)) {
            $('.notifyTray').removeClass('is-sticky');
         } else {
            $('.notifyTray').addClass('is-sticky');
         }
      });
   }
});

function isScrolledIntoView(elem, padding) {
   var docViewTop = $(window).scrollTop();
   var docViewBottom = docViewTop + $(window).height() - padding;
   var elemTop = $(elem).offset().top;
   return ((elemTop <= docViewBottom));
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
