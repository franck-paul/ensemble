/*global dotclear_ensemble */
'use strict';

/* From Colin Fahrion (https://codepen.io/colinaut/pen/dyNpdOV) */

/* Button markup to be inserted (widget or …)
<div id="theme-toggle" data-state="auto">
  <label>
  <input value="light" name="state-d" type="radio" /> <span>Clair</span>
  </label>
  <label>
    <input value="auto" name="state-d" type="radio" checked /> <span>Auto</span>
  </label>
  <label>
    <input value="dark" name="state-d" type="radio" /> <span>Sombre</span>
  </label>
</div>
*/

dotclear_ensemble.darkmode = () => {
  /*!
   * Get the first matching element in the DOM
   * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} selector The element selector
   * @param  {Node}   parent   The parent to search in [optional]
   * @return {Node}            The element
   */
  let pick_elt = (selector, parent) => (parent ? parent : document).querySelector(selector);

  /*!
   * Get an array of all matching elements in the DOM
   * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} selector The element selector
   * @param  {Node}   parent   The parent to search in [optional]
   * @return {Array}           Th elements
   */
  let pick_elts = (selector, parent) => Array.prototype.slice.call((parent ? parent : document).querySelectorAll(selector));

  // Grab state from localStorage
  const storedMode = window.localStorage.getItem('darkmode');

  // setState based on stored mode or set to auto
  const setState = (state) => {
    document.body.classList.remove('light', 'dark');
    if (state !== 'auto')
      document.body.classList.add(state);
    window.localStorage.setItem('darkmode', state);
  };

  if (storedMode) {
    pick_elt(`#theme-toggle input[value='${storedMode}']`).checked = true;
    setState(storedMode);
  } else
    setState('auto');

  pick_elts('#theme-toggle input').forEach((t) => {
    t.addEventListener('click', () => {
      if (t.checked)
        setState(t.getAttribute('value'));
    });
  });
};

document.addEventListener('DOMContentLoaded', () => dotclear_ensemble.darkmode());
