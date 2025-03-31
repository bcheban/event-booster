import EventsApiService from './fetchEvents';
import markUpEvents from '../templates/card';
import { renderPagination } from './pagination';

const list = document.getElementById('js-list');
const paginationList = document.querySelector('.pagination__list');
const search = document.getElementById('searchInput');
const form = document.getElementById('headerForm');

const eventsApiService = new EventsApiService();

renderEvent();

search.addEventListener('input', onSearchQuery);

async function onSearchQuery(e) {
    e.preventDefault()

    eventsApiService.searchQuery = search.value.trim();
    eventsApiService.page = 0;
    clearEventsList();
    clearPagination();

    await renderEvent();
}

export default async function renderEvent({ countryCode } = {}) {
    try {
        if (countryCode) {
            eventsApiService.searchCountry = countryCode;
        }

        clearEventsList()

        console.log(countryCode);

        const data = await eventsApiService.fetchEvents();
        const events = data._embedded?.events || [];
        const markUp = markUpEvents(events);

        list.insertAdjacentHTML('beforeend', markUp);
        const totalPages = data.page.totalPages;
        renderPagination(totalPages, eventsApiService.page, onPageClick);
    } catch (error) {
        console.error(error.status);
    }
}

export function clearEventsList() {
    list.innerHTML = '';
}

function onPageClick(newPage) {
    if (newPage === eventsApiService.page) return;
    eventsApiService.page = newPage;
    clearEventsList();
    renderEvent();
}

export function clearPagination() {
    paginationList.innerHTML = '';
}