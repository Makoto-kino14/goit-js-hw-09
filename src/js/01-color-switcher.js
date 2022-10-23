import '../css/common.css';

const startBittonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButtonEl.setAttribute('disabled', '');

startBittonEl.addEventListener('click', element => {
  element.target.setAttribute('disabled', true);
  stopButtonEl.removeAttribute('disabled');

  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButtonEl.addEventListener('click', element => {
  element.target.setAttribute('disabled', true);
  startBittonEl.removeAttribute('disabled');

  clearInterval(interval);
});