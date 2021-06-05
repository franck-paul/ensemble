'use strict';

let ensemble = {
  breakpoint: null,
  timerId: null,

  debounceFunction: function (func, delay) {
    if (ensemble.timerId) {
      clearTimeout(ensemble.timerId);
    }
    ensemble.timerId = setTimeout(func, delay);
  },

  doShrinkHeader: function () {
    let header = document.querySelector('.header');
    if (ensemble.breakpoint > 0) {
      if (window.pageYOffset >= ensemble.breakpoint) {
        header.classList.add('shrink');
        ensemble.breakpoint = header.offsetHeight;
      } else if (window.pageYOffset < ensemble.breakpoint) {
        header.classList.remove('shrink');
        ensemble.breakpoint = header.offsetHeight;
      }
    }
  },
};

document.addEventListener('DOMContentLoaded', function () {
  ensemble.breakpoint = document.querySelector('.header').offsetHeight;
});

window.addEventListener('scroll', function () {
  ensemble.debounceFunction(ensemble.doShrinkHeader, 200);
});
