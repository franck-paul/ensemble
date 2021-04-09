'use strict';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

window.addEventListener('scroll', function () {
  let header = document.querySelector('.header');
  if (window.pageYOffset > 80) {
    sleep(200).then(() => {
      header.classList.add('shrink');
    });
  } else {
    sleep(200).then(() => {
      header.classList.remove('shrink');
    });
  }
});
