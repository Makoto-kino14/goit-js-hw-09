import '../css/common.css';
import '../css/02-timer.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let timerId = null;

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      daysRef.textContent = days;
      hoursRef.textContent = addLeadingZero(hours);
      minutesRef.textContent = addLeadingZero(minutes);
      secondsRef.textContent = addLeadingZero(seconds);

      if (
        daysRef.textContent === '0' &&
        hoursRef.textContent === '00' &&
        minutesRef.textContent === '00' &&
        secondsRef.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    startBtn.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });

// const startBtn = document.querySelector('button[data-start]');
// const daysRef = document.querySelector('span[data-days]');
// const hoursRef = document.querySelector('span[data-hours]');
// const minutesRef = document.querySelector('span[data-minutes]');
// const secondsRef = document.querySelector('span[data-seconds]');
// let selectedDate = null;

// startBtn.setAttribute('disabled', true);

// function addLeadingZero(value) {
//   String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// const options = {
//   enableTime: true,
//   // Enables time picker
//   time_24hr: true,
//   //   Displays time picker in 24 hour mode without AM/PM selection when enabled.
//   defaultDate: new Date(),
//   //   Sets the initial selected date(s).
//   minuteIncrement: 1,
//   //   Adjusts the step for the minute input (incl. scrolling)
//   onClose(selectedDates) {
//     // console.log(selectedDates[0]);
//     selectedDate = selectedDates[0];
//     if (selectedDate < new Date()) {
//       window.alert('Please choose a date in the future');
//       //   startBtn.setAttribute('disabled', true);
//     } else {
//       startBtn.removeAttribute('disabled', '');
//       //   Function(s) to trigger on every time the calendar is closed. selectedDates - an array of Date objects selected by the user. When there are no dates selected, the array is empty.
//     }
//   },
// };

// const countdownTimer = {
//   intervalID: null,
//   isActive: false,

//   start() {
//     if (this.isActive) {
//       return;
//     }

//     const currentTime = Date.now();
//     this.isActive = true;
//     this.intervalID = setInterval(() => {
//       const deltaTime = onClose.selectedDate.bind(options) - currentTime;
//       const time = convertMs(deltaTime);
//       updateCountdownFace(time);
//     }, 1000);
//   },

//   //   stop() {
//   //     clearInterval(this.intervalID);
//   //     this.isActive = false;
//   //   },
// };

// console.log(countdownTimer.start.deltaTime);

// function updateCountdownFace({ days, hours, minutes, seconds }) {
//   daysRef.textContent = days;
//   hoursRef.textContent = hours;
//   minutesRef.textContent = minutes;
//   secondsRef.textContent = seconds;
// }

// startBtn.addEventListener('click', () => {
//   countdownTimer.start;
// });

// flatpickr('#datetime-picker', options);
