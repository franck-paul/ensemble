'use strict';

let breakpoint = null;
let timerId = null;

let debounceFunction = function (func, delay) {
  // Cancels the setTimeout method execution
  if (timerId) {
    clearTimeout(timerId);
  }
  // Executes the func after delay time.
  timerId = setTimeout(func, delay);
};

let doShrinkHeader = function() {
  let header = document.querySelector('.header');
  if (breakpoint > 0) {
    if (window.pageYOffset >= breakpoint) {
      header.classList.add('shrink');
      breakpoint = header.offsetHeight;
    } else if (window.pageYOffset < breakpoint) {
      header.classList.remove('shrink');
      breakpoint = header.offsetHeight;
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  breakpoint = document.querySelector('.header').offsetHeight;
});

window.addEventListener('scroll', function () {
  debounceFunction(doShrinkHeader, 200);
});
