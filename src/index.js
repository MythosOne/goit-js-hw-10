import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const card = document.querySelector('.country-info');
input.addEventListener('input', debounce(OnSearch, DEBOUNCE_DELAY));



function OnSearch(event) {
    // event.preventDefault();
    const SearchValue= event.target.value.trim();

    if (!SearchValue) {
        list.remove();
        card.remove();
        return;
    }

    fetchCountries(SearchValue).then(data => {
        console.log(data.length);
        if (data.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        } else if (data.length > 1 & data.length <= 10) {
            console.log('👌');
            creatMarkupFound(data);
        } else if (data.length === 1) {
            list.remove();
            creatMarkupCard(data);
        }
    });
}

function creatMarkupFound(data) {
    const markup = data.map(({ flags, name }) => `<li>
    <img src="${flags.svg}" width="40px" alt="${name}"/>
    <h2>${name}</h2>
    </li>`);
    list.style.display = 'flex';
    list.style.flexDirection = "column";
    list.style.gap = "20px";
    list.style.listStyle = "none";
    list.innerHTML = markup.join('');
}

function creatMarkupCard(data) {
    const markup = data.map(({ flags, name, capital, population, languages }) =>
    `<div class="country-info"><img src="${flags.svg}" width="70px" alt="${name}" />
    <h1>${name}</h1>
    <ul>
    <li><span>Capital:${capital}</span></li>
    <li><span>Population:${population}</span></li>
    <li><span>Languages:${languages.map(({name})=> `<span>${name}</span>`).join(', ')}</span></li>
    </ul>
    </div>`
    );
    card.innerHTML = markup.join('');
}