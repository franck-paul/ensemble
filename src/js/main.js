'use strict';
let dotclear_ensemble;

dotclear_ensemble = {
  breakpoint: null, // Height of current header, in pixels
  shrinked: false,
  timerId: null,

  debounceFunction: (func, delay) => {
    if (dotclear_ensemble.timerId) {
      clearTimeout(dotclear_ensemble.timerId);
    }
    dotclear_ensemble.timerId = setTimeout(func, delay);
  },

  doShrinkHeader: () => {
    // Find blog header
    let header = document.querySelector('.header');
    if (dotclear_ensemble.breakpoint > 0) {
      if (!dotclear_ensemble.shrinked && (window.pageYOffset >= dotclear_ensemble.breakpoint)) {
        // Page scrolled, shrink header
        header.classList.add('shrink');
        dotclear_ensemble.breakpoint = header.offsetHeight;
        dotclear_ensemble.shrinked = true;
      } else if (dotclear_ensemble.shrinked && (window.pageYOffset === 0)) {
        // Page come back to top, unshrink header
        header.classList.remove('shrink');
        dotclear_ensemble.breakpoint = header.offsetHeight;
        dotclear_ensemble.shrinked = false;
      }
      // Fix anchor link managment — still buggy in Safari (see https://bugs.webkit.org/show_bug.cgi?id=179379)
      document.querySelector('html').style.scrollPaddingTop = `${dotclear_ensemble.breakpoint + 24}px`;
    }
  },
};

// Get current height of header
document.addEventListener(
  'DOMContentLoaded',
  () => (dotclear_ensemble.breakpoint = document.querySelector('.header').offsetHeight)
);

// Watch page scrolling and (un)shrink header if necessary
window.addEventListener('scroll', () => dotclear_ensemble.debounceFunction(dotclear_ensemble.doShrinkHeader, 200));
