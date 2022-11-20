const BASE_URL = 'https://restcountries.com/v2';
const API_KEY = 'name,capital,population,flags,languages';

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=${API_KEY}`).then(resp => {
        // console.log(resp);
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    }).catch(err => console.error(err));
}