import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay }); 
      }
    }, delay);
  });
  }

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

  function onFormSubmit(event) {
    event.preventDefault();

    let delay = Number(event.currentTarget.delay.value);
    const step = Number(event.currentTarget.step.value);
    const amount = Number(event.currentTarget.amount.value);

  for (let i = 1; i <= amount; i++){
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
