$(document).ready(function() {
   $('.blurBox').children('.blurBox-card').hover(
      function() {
         $(this)
            .addClass('is-active')
            .siblings()
            .addClass('is-blurred');
         $(this)
            .closest('.blurBox')
            .addClass('is-blurred');
      },
      function() {
         $(this)
            .removeClass('is-active')
            .siblings()
            .removeClass('is-blurred');
         $(this)
            .closest('.blurBox')
            .removeClass('is-blurred');
      }
   );
});
