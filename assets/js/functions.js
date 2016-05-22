$( document ).ready(function() {

  smoothScrool(700);
  workBelt();
  workLoad();
  clientCtrl();

  $("header h1").fitText(1.2, { minFontSize: '20px', maxFontSize: '76px' });
});

function smoothScrool(duration) {
  $('a[href^="#"]').on("click", function(event) {
    var target = $($(this).attr('href'));

    if( target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}

function workBelt() {
  $('.thumb-unit').on('click', function () {
    $('.work-belt').css('left', '-100%');
    $('.work-container').show();
  })

  $('.work-back').on('click', function () {
    $('.work-belt').css('left', '0%');
    $('.work-container').hide(500);   //doesn't disappea at once, it disappears in 0.8s
  })
}

function workLoad() {

  // $.ajaxSetup({cache: true})

  $('.thumb-unit').click(function () {
    var $this = $(this),
        newTitle = $this.find('strong').text(),
        newFolder = $this.data('folder'),
        spinner = '<div class="loader">Loading...</div>',
        newHtml = '/work/'+ newFolder +'.html';

    $('.project-title').text(newTitle);
    $('.project-load').html(spinner).load(newHtml);

  })
}

function clientCtrl() {
  $('.client-unit').first().addClass('active-client');
  $('.client-logo').first().addClass('active-client');
  $('.clients-mobile-nav span').first().addClass('active-client');

  $('.client-logo, .clients-mobile-nav span').click(function () {
    var $this = $(this),
        $siblings = $this.parent().children(),
        position = $siblings.index($this);

    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    $('.client-logo').removeClass('active-client').eq(position).addClass('active-client');
    $siblings.removeClass('active-client');
    $this.addClass('active-client');
  });

  $('.client-control-next, .client-control-prev').click(function () {
    var $this = $(this)
        curActiveClient = $('.clients-belt').find('.active-client'),
        position = $('.client-unit').index(curActiveClient),
        length = $('.client-unit').length;

    if($this.hasClass('client-control-next')) {

      if(position < length - 1) {
        $('.active-client').removeClass('active-client').next().addClass('active-client');
      }
      else {
        $('.client-unit').removeClass('active-client').first().addClass('active-client');
        $('.client-logo').removeClass('active-client').first().addClass('active-client');
      }

    }
    else {

      if(position > 0) {
        $('.active-client').removeClass('active-client').prev().addClass('active-client');
      }
      else {
        $('.client-unit').removeClass('active-client').last().addClass('active-client');
        $('.client-logo').removeClass('active-client').last().addClass('active-client');
      }

    }
  })
}


/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
