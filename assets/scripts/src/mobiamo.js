(function() {

  'use strict';

  var carouselItemSelector = '.carousel-controls li',
      burgerSelector       = '#burger',
      windowSelector       = window;

  function initialize() {
    $(carouselItemSelector).on('click', carouselHandler);
    $(burgerSelector).on('click', burgerHandler);
    $(windowSelector).on('scroll', scrollHandler);
  }

  function carouselHandler() {
    var itemId = $(this).attr('id');

    $(this)
      .addClass('active-btn')
      .siblings()
      .removeClass('active-btn');

    $('.carousel-descr')
      .filter('.carousel-descr-' + itemId)
      .removeClass('hidden')
      .siblings()
      .addClass('hidden');

    $('.carousel-figure')
      .filter('.carousel-figure-' + itemId)
      .removeClass('hidden')
      .siblings()
      .addClass('hidden');
  }

  function burgerHandler() {
    $('.l-login ul').slideToggle();
    $(this).toggleClass('close');
    $('#mainNavGetStarted').toggleClass('hidden');

    if ($(window).scrollTop() < 550) {
      $('.b-mainNav').toggleClass('mainNavOpen');
      $('.b-brand__header').toggleClass('brand-blue');
    }
  }

  function scrollHandler() {
    if ($(this).scrollTop() > 50) {
      $('.b-mainNav').addClass('mainNavOpen');
      $('.b-brand__header').addClass('brand-blue');
      $('#mainNavGetStartedLeft').removeClass('hidden')
      $('#mainNavGetStartedLeftStat').removeClass('button__getStartedTrans');
      $('.b-brand__header').addClass('b-brand__headerBlue');
    } else {
      $('.b-mainNav').removeClass('mainNavOpen');
      $('.b-brand__header').removeClass('brand-blue');
      $('#mainNavGetStartedLeft').addClass('hidden');
      $('#mainNavGetStartedLeftStat').addClass('button__getStartedTrans');
      $('.b-brand__header').removeClass('b-brand__headerBlue');
    }
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    initialize();
  });

})();