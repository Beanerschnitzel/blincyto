$(document).ready(function() {
   $('.notifyMain-copy').truncateText({
      lengthLg: 300,
      lengthMed: 200,
      lengthSm: 120,
      toggleText: "Read More"
   });

   $('.notifyMain').addClass('slideDown');

   $('.notifyMain-close').click(function(event) {
      event.preventDefault();
      $(this).closest('.notifyMain').addClass('is-closed');
   });

   $(window).scroll(function() {
      if (!$('.notifyMain').hasClass('is-closed') && $(this).scrollTop() > 10) {
         $('.notifyMain').addClass('is-closed')
      }
   });
});


(function($) {
   $.fn.truncateText = function(opts) {
      var defaults = {
         lengthSm: 50,
         lengthMed: 100,
         lengthLg: 150,
         breakSm: 500,
         breakLg: 850,
         toggleText: "Show"
      };
      var options = $.extend({}, defaults, opts);

      var $containers = this;

      var visibleLegnthEffective;
      var visibleLegnthSm = options.lengthSm;
      var visibleLegnthMed = options.lengthMed;
      var visibleLegnthLg = options.lengthLg;

      var breakSm = options.breakSm;
      var breakLg = options.breakLg;

      var toggleText = options.toggleText;

      var firstRun = true;

      initialize();

      $(window).on('resize orientationchange', function() {
         unwrap();
      });

      function unwrap() {
         $containers.each(function() {
            $(this).find('.ellipse').remove();
            $(this).find('.showToggle').click().remove();
            $(this).html($(this).attr('data-original'));
            $(this).css('max-height', '');
         });
         initialize();
      }

      function initialize() {
         if (window.matchMedia("(max-width:" + breakSm + "px)").matches) {
            visibleLegnthEffective = visibleLegnthSm;
         } else if (window.matchMedia("(max-width:" + breakLg + "px)").matches) {
            visibleLegnthEffective = visibleLegnthMed;
         } else {
            visibleLegnthEffective = visibleLegnthLg;
         }
         wireUp();
      }

      function wireUp() {
         //loop through each container and wire up indiviually 
         $containers.each(function() {
            var $container = $(this);
            var fullHeight = $container.outerHeight();
            var truncHeight;
            var originalHtml = $container.html();
            var originalText = $container.text();
            var truncatedText = $(originalHtml.substring(0, visibleLegnthEffective));
            var $showMore = $('<a class="showToggle" style="margin-left:5px;font-weight:bold;cursor:pointer;">' + toggleText + '</a>' + '<i class="colorBrandBlue fa-chevron-right ml-1">' + '</i>')

            truncatedText.append($('<i class="ellipse">...</i>')).append($showMore);
            $container.html(truncatedText);

            truncHeight = $container.outerHeight();

            $container.attr('data-maxHeight', fullHeight);
            $container.attr('data-minHeight', truncHeight);
            $container.attr('data-original', originalHtml);

            $container.css('max-height', $(this).attr('data-minHeight') + 'px');

            //add show event to generated toggle buttons
            $showMore.click(function() {
               $container.css('max-height', $container.attr('data-maxHeight') + 'px');
               $container.html(originalHtml);
            });
            $('.openNotifyMain').click(function(e) {
               e.preventDefault();

               $container.css('max-height', $container.attr('data-maxHeight') + 'px');
               $container.html(originalHtml);

               if ($('.notifyMain').hasClass('is-closed')) {
                  $('.notifyMain').hide().removeClass('is-closed').slideDown(250);
               }
            });
            return $container;
         });
      }
      return $containers;
   };
}(jQuery));

// $(document).ready(function() {
//    var Cookies = document.cookie;
//    if (document.getCookie('indicationsTrayVisibility') !== "closedTray") {
//       // create Indication Tray
//       var expiresDate = new Date();
//       var minutes = 720; // 12 hours
//       expiresDate.setTime(expiresDate.getTime() + (minutes * 60 * 1000));
//       Cookies.set('indicationsTrayVisibility', "closedTray", { expires: expiresDate, path: '/' });
//    }

//    function notificationDisplay() {
//       var $notification = $('.notification').slideDown();
//       $('.notification').addClass('full');
//       $('.notification-text-preview').hide();
//       $('.notification-text-full').show();

//       // Update Cookie
//       var expiresDate = new Date();
//       var minutes = 720; // 12 hours
//       expiresDate.setTime(expiresDate.getTime() + (minutes * 60 * 1000));
//       Cookies.set('indicationsTrayVisibility', "closedTray", { expires: expiresDate, path: '/' });
//    }
// });
