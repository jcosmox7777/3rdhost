$(function(){
  console.log('scripts.js loaded and initialized.');

  // Parallax Scrolling
  var rellax = new Rellax('.rellax', {
    //breakpoints: [576, 768, 1201]
  });

  // Animate on Scroll Transitions
  AOS.init({
      duration: 1000,
      // ease: 'ease-out',
      anchorPlacement: 'center-bottom'
  });

  $("#hmcDownArrow").on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(window).height() - 65
    }, 800);
  });

  let stickyOffset = $('body').hasClass('admin-bar') ? 105 : 75;

  $('#sticker').stickybits({
    useStickyClasses: true,
    verticalPosition: 'top',
    stickyBitStickyOffset: stickyOffset,
    useFixed: true
  });

  $("#hmcDownArrow").on('tap', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(window).height()
    }, 800);
  });

  $(".no-touchevents a .fa-search").on('click', function(){
    $("#search-bar input").val('');
    $("#search-bar input").focus();
  });

  $(".touchevents .fa-search").on('click tap', function(){
    $("#search-bar input").val('');
  });

  $('.navbar-toggle').on('click tap', function(e) {
    e.preventDefault();
    $('body').toggleClass('mobile-nav-open');
  });

  $('#mobile-nav > ul > li > a').on('click tap', function(e) {
    var drop = $(e.target).parent('li').children('.sub-menu').length
    if(drop) {
      e.preventDefault()
      $(e.target).parent('li').toggleClass('open')
    }
  })

  $('.controls .show-more').on('click', function(e) {
    console.log('click more');
    $('.controls .hide').removeClass('hide');
    $('.show-more').hide();
  });

  $('.show-all-cats').on('click', function(e) {
    $('.all-cats').toggleClass('hide');
    $('.show-all-cats').toggleClass('open');
  });

  $('.all-cats').on('click', function() {
    $('.all-cats').toggleClass('hide');
  });

  // Leadership Bios
  if($('body').hasClass('page-template-page-who-we-are')) {


    $('.leadership-tabs .btn').on('click', function() {
        var group = $(this).attr('data-show-group');

        // set tab
        $('.leadership-tabs .btn').removeClass('active');
        $(this).addClass('active');

        // set tab-pane
        $('[data-leader-group]').hide();
        $('[data-leader-group="' + group + '"]').show();
    })

    // taps outside of thumbnail close the dealy
    $('.leadership').on('click', function(e) {
      if($('body').outerWidth() < 767) {
        //console.log('e.target', e.target);
        if($(e.target).hasClass('photo') || $(e.target).hasClass('leader-sep') || $(e.target).hasClass('text-inner') || $(e.target).hasClass('bio') || $(e.target).is('h4') || $(e.target).hasClass('center-me')) {
          // do nothing
        } else {
          $('.leader').removeClass('current'); // reset current leader
          $('.leader').removeClass('faded'); // reset leaders to be clickable again
          $('.leader-sep').removeClass('open'); // hide this row's expanded content
        }
      }
    });

    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        $('.leader').removeClass('open')
      }
    })

    $('.pop').on('click', function(e) {
      if($(e.target).hasClass('pop')) {
        $('.leader').removeClass('open')
      }
    })

    $("[data-bio-trigger]").on('click', function(e) {
      e.preventDefault();
      if($('body').outerWidth() > 767) {
        $(e.currentTarget).parents('.leader').addClass('open');
      } else {
        var leader = $(e.currentTarget).parents('.leader');
        var pop = leader.find('.pop');
        var sep = leader.next('.sep');
        var row = leader.data('mobile-row');

        // console.log('.leader', leader);
        // console.log('pop', pop);
        // console.log('sep', sep);
        // console.log('row', row);

        /*
        if(leader.hasClass('faded')) {
          return false; // ignore taps on faded thumbnails when focusing on one leader
        }
        */

        $('.leader').addClass('faded'); // remove all

        leader.removeClass('faded'); // set fresh
        leader.add('current'); // set current leader


        $('.leader-sep').removeClass('open'); // remove all
        $('.leader-sep.row-' + row).html(pop.html()).addClass('open'); // inject content into active row

        // set click actions for close button after freshly injecting content
        $('.leader-sep .close').on('click', function(e) {
          e.preventDefault()
          $('.leader').removeClass('current'); // reset current leader
          $('.leader').removeClass('faded'); // reset leaders to be clickable again
          $('.leader-sep').removeClass('open'); // hide this row's expanded content
        });
      }
    })

    $('.leader .close').on('click', function(e) {
      e.preventDefault()
      $('.leader').removeClass('open')
    });
  }

  if($('body').hasClass('single-post')) {
    // Show form on click
    $('[data-trigger-contact]').on('click', function(e) {
      e.preventDefault();
      var formId = $(e.currentTarget).data('trigger-contact');
      $(formId).toggleClass('hide');
    });

    // Form actions
    // contact-contributor
    $('form.contact-contributor').on('submit', function(e) {
      e.preventDefault();

      $.post(e.currentTarget.action, $("form").serialize(), function(data) {
        var nm = $('.contact-contributor .first_name').val();
        var em = $('.contact-contributor .email').val();
        var ph = $('.contact-contributor .phone').val();
        var cm = $('.contact-contributor .comments').val();

        if(!nm || !em || !ph || !cm) {
          alert('Please fill out all form fields.');
          return false;
        }

        if(data === 'nope') {
          alert('Please verify you are a human being, using the captcha before submitting the form again.');
        } else {
          $(e.currentTarget).html('<h3 class="tc" style="margin: 0;">Thanks for the message, it has been sent!</h3>');
        }
      });

    });

    $('form.contact-contributor').on('submit', function(e) {
      e.preventDefault();

      $.post(e.currentTarget.action, $("form").serialize(), function(data) {
        var nm = $('.contact-contributor .first_name').val();
        var em = $('.contact-contributor .email').val();
        var ph = $('.contact-contributor .phone').val();
        var cm = $('.contact-contributor .comments').val();

        if(!nm || !em || !ph || !cm) {
          alert('Please fill out all form fields.');
          return false;
        }

        if(data === 'nope') {
          alert('Please verify you are a human being, using the captcha before submitting the form again.');
        } else {
          $(e.currentTarget).html('<h3 class="tc" style="margin: 0;">Thanks for the message, it has been sent!</h3>');
        }
      });

    });

    //alert('here with bells');
    $('[data-show]').on('click', function(e) {
      e.preventDefault();
      var showMe = $(this).attr('data-show');
      $(this).hide();
      $(showMe).show();
    })

    $('.btn.request').on('click', function() {
      var thisForm = $(this).parents('form.squeeze');
      thisForm.find("input.first").focus();

      // Google Analytics Track Submission Completed
      ga('send', 'event', {
        eventCategory: 'Download Protected Report',
        eventAction: 'Started Form',
        eventLabel: thisForm.find('.report_name').val(),
        eventValue: 1
      });
    })

    $('.btn.direct').on('click', function() {
      // Google Analytics Track Standard Un-protected downloads
      console.log('click');
      ga('send', 'event', {
        eventCategory: 'Download Report',
        eventAction: 'Clicked Download Button',
        eventLabel: $(this).attr('data-download-name'),
        eventValue: 1
      });
    })

    $('form.squeeze').on('submit', function(e) {
      e.preventDefault();

      var thisForm = $(e.currentTarget);

      // Quick Validation
      var fn = thisForm.find('.first_name').val();
      var ln = thisForm.find('.last_name').val();
      var em = thisForm.find('.email').val();

      console.log('fn,ln,em', fn,ln,em);

      if(!fn || !ln || !em) {
        alert('Please fill out all required form fields in order to receive the report.');
        return false;
      }

      $.post(thisForm.attr('action'), thisForm.serialize(), function(data) {
        console.log('raw data from php', data);
        var res = JSON.parse(data);
        console.log('form response', res);

        // Google Analytics Track Submission Completed
        ga('send', 'event', {
          eventCategory: 'Download Protected Report',
          eventAction: 'Submitted Form',
          eventLabel: $(e.currentTarget).find('.report_name').val(),
          eventValue: 1
        });

        if(res.code < 300) {
          console.log('yep');
          $('form.squeeze fieldset').hide();
          $('form.squeeze .thanks').show();
        } else {
          console.log('nope', res);
          alert('Error submitting.  Please fill out all required form fields correctly in order to receive the report.');
        }
      });

    });








  }
});

$(window).load(function(){
  $("#hmcDownArrow").addClass('display_arrow');
});
