'use strict';

let ensemble = {
  breakpoint: null,   // Height of current header, in pixels
  timerId: null,

  debounceFunction: function (func, delay) {
    if (ensemble.timerId) {
      clearTimeout(ensemble.timerId);
    }
    ensemble.timerId = setTimeout(func, delay);
  },

  doShrinkHeader: function () {
    // Find blog header
    let header = document.querySelector('.header');
    if (ensemble.breakpoint > 0) {
      if (window.pageYOffset >= ensemble.breakpoint) {
        // Page scrolled, shrink header
        header.classList.add('shrink');
        ensemble.breakpoint = header.offsetHeight;
      } else if (window.pageYOffset < ensemble.breakpoint) {
        // Page come back to top, unshrink header
        header.classList.remove('shrink');
        ensemble.breakpoint = header.offsetHeight;
      }
      // Fix anchor link managment — still buggy in Safari (see https://bugs.webkit.org/show_bug.cgi?id=179379)
      document.querySelector('html').style.scrollPaddingTop = `${ensemble.breakpoint + 24}px`;
    }
  },
};

// Get current height of header
document.addEventListener('DOMContentLoaded', () => ensemble.breakpoint = document.querySelector('.header').offsetHeight);

// Watch page scrolling and (un)shrink header if necessary
window.addEventListener('scroll', () => ensemble.debounceFunction(ensemble.doShrinkHeader, 200));
