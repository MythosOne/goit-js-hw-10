import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

buttonStart.setAttribute('disabled', true);

flatpickr(picker, 
    {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            buttonStart.removeAttribute('disabled');
            buttonStart.addEventListener('click', onStartClick);
        }
    },
    });

function onStartClick() {
    timer.start();
}
    
const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        }

        const selectTime = Date.parse(picker.value);
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const onlineTime = Date.now();
            const timeDifference = selectTime - onlineTime;
            if (timeDifference < 1000) {
                clearInterval(this.intervalId);
                buttonStart.setAttribute('disabled', true);
            }
            const time = convertMs(timeDifference);
            updateTimePickerFace(time);
        }, 1000);
    }
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function updateTimePickerFace({ days, hours, minutes, seconds }) {
    daysSpan.textContent = `${days}`;
    hoursSpan.textContent = `${hours}`;
    minutesSpan.textContent = `${minutes}`;
    secondsSpan.textContent = `${seconds}`;
}