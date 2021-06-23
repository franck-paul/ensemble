'use strict';

let dotclear_ensemble = {
  breakpoint: null,   // Height of current header, in pixels
  timerId: null,

  debounceFunction: function (func, delay) {
    if (dotclear_ensemble.timerId) {
      clearTimeout(dotclear_ensemble.timerId);
    }
    dotclear_ensemble.timerId = setTimeout(func, delay);
  },

  doShrinkHeader: function () {
    // Find blog header
    let header = document.querySelector('.header');
    if (dotclear_ensemble.breakpoint > 0) {
      if (window.pageYOffset >= dotclear_ensemble.breakpoint) {
        // Page scrolled, shrink header
        header.classList.add('shrink');
        dotclear_ensemble.breakpoint = header.offsetHeight;
      } else if (window.pageYOffset < dotclear_ensemble.breakpoint) {
        // Page come back to top, unshrink header
        header.classList.remove('shrink');
        dotclear_ensemble.breakpoint = header.offsetHeight;
      }
      // Fix anchor link managment — still buggy in Safari (see https://bugs.webkit.org/show_bug.cgi?id=179379)
      document.querySelector('html').style.scrollPaddingTop = `${dotclear_ensemble.breakpoint + 24}px`;
    }
  },
};

// Get current height of header
document.addEventListener('DOMContentLoaded', () => dotclear_ensemble.breakpoint = document.querySelector('.header').offsetHeight);

// Watch page scrolling and (un)shrink header if necessary
window.addEventListener('scroll', () => dotclear_ensemble.debounceFunction(dotclear_ensemble.doShrinkHeader, 200));
