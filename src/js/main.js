'use strict';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var breakpoint = null;

document.addEventListener('DOMContentLoaded', function () {
  breakpoint = document.querySelector('.header').offsetHeight;
});

window.addEventListener('scroll', function () {
  let header = document.querySelector('.header');
  if (breakpoint > 0) {
    if (window.pageYOffset >= breakpoint) {
      sleep(200).then(() => {
        header.classList.add('shrink');
        breakpoint = header.offsetHeight;
      });
    } else if (window.pageYOffset < breakpoint) {
      sleep(200).then(() => {
        header.classList.remove('shrink');
        breakpoint = header.offsetHeight;
      });
    }
  }
});
