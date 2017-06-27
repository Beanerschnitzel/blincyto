// //toggle search on lg screens

// jQuery(document).ready(function($) {
//   var mql = window.matchMedia("(min-width: 992px)");

//   function navMainSubColumns() {
//     $('.headerMain-subNav').each(
//       function() {
//         if ($(this).children('li').length > 3) {
//           $(this).addClass('twoColumn');
//         }
//       }
//     );
//   }

//   function resetIt() {
//     $('.headerMain-subNav').removeClass('twoColumn');
//   }

//   function screenSize(mql) {
//     if (mql.matches) {
//       navMainSubColumns();
//     } else {
//       resetIt();
//     }
//   }

//   // Handle media query 'change' event
//   mql.addListener(screenSize);
//   screenSize(mql);
// });
