import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(OnSearch, DEBOUNCE_DELAY));

const list = document.querySelector('.country-list');
// const listCard = document.querySelector('.country-info');

function OnSearch(event) {
    const SearchValue= event.target.value.trim();

    if (!SearchValue) {
        list.remove();
        return;
    }
    fetchCountries(SearchValue).then(data => creatMarkup(data));
    
}

function creatMarkup(arr) {
    const markup = arr.map(({flags, name}) => `<li style='display:flex'>
    <img src="${flags.svg}" width="40px" alt="${name}"/>
    <h2>${name}</h2>
    </li>`);
    list.style.display = 'flex';
    list.style.flexDirection = "column";
    list.style.gap = "20px";
    list.style.listStyle = "none";
    list.innerHTML = markup.join('');
}

// function creatMarkupCard(arr) {
//     const markup = arr.map(({ flags, name, capital, population, languages }) =>
//         `<div class="country-info"><img src="${flags.svg}" width="70px" alt="${name}" />
//         <h1>${name}</h1>
//         <ul>
//         <li><span>Capital:${capital}</span></li>
//         <li><span>Population:${population}</span></li>
//         <li><span>Languages:${languages.map(({name})=> `<span>${name}</span>`).join(', ')}</span></li>
//         </ul>
//         </div>`
//     );
//     list.innerHTML = markup.join('');
// }