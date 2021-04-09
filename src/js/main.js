'use strict';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

window.addEventListener('scroll', function () {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    sleep(200).then(() => {
      document.querySelector('.header').classList.add('shrink');
    });
  } else {
    sleep(200).then(() => {
      document.querySelector('.header').classList.remove('shrink');
    });
  }
});
