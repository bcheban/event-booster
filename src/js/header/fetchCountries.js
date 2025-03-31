import renderEvent from "../baseMarkUp";
import EventsApiService from '../fetchEvents';
import { clearEventsList, clearPagination } from '../baseMarkUp';

const eventsApiService = new EventsApiService();

async function renderCountries() {
  try {
    const countries = [
      { code: 'US', name: 'United States Of America' },
      { code: 'AD', name: 'Andorra' },
      { code: 'AI', name: 'Anguilla' },
      { code: 'AR', name: 'Argentina' },
      { code: 'AU', name: 'Australia' },
      { code: 'AT', name: 'Austria' },
      { code: 'AZ', name: 'Azerbaijan' },
      { code: 'BS', name: 'Bahamas' },
      { code: 'BH', name: 'Bahrain' },
      { code: 'BB', name: 'Barbados' },
      { code: 'BE', name: 'Belgium' },
      { code: 'BM', name: 'Bermuda' },
      { code: 'BR', name: 'Brazil' },
      { code: 'BG', name: 'Bulgaria' },
      { code: 'CA', name: 'Canada' },
      { code: 'CL', name: 'Chile' },
      { code: 'CN', name: 'China' },
      { code: 'CO', name: 'Colombia' },
      { code: 'CR', name: 'Costa Rica' },
      { code: 'HR', name: 'Croatia' },
      { code: 'CY', name: 'Cyprus' },
      { code: 'CZ', name: 'Czech Republic' },
      { code: 'DK', name: 'Denmark' },
      { code: 'DO', name: 'Dominican Republic' },
      { code: 'EC', name: 'Ecuador' },
      { code: 'EE', name: 'Estonia' },
      { code: 'FO', name: 'Faroe Islands' },
      { code: 'FI', name: 'Finland' },
      { code: 'FR', name: 'France' },
      { code: 'GE', name: 'Georgia' },
      { code: 'DE', name: 'Germany' },
      { code: 'GH', name: 'Ghana' },
      { code: 'GI', name: 'Gibraltar' },
      { code: 'GB', name: 'Great Britain' },
      { code: 'GR', name: 'Greece' },
      { code: 'HK', name: 'Hong Kong' },
      { code: 'HU', name: 'Hungary' },
      { code: 'IS', name: 'Iceland' },
      { code: 'IN', name: 'India' },
      { code: 'IE', name: 'Ireland' },
      { code: 'IL', name: 'Israel' },
      { code: 'IT', name: 'Italy' },
      { code: 'JM', name: 'Jamaica' },
      { code: 'JP', name: 'Japan' },
      { code: 'KR', name: 'Korea, Republic of' },
      { code: 'LV', name: 'Latvia' },
      { code: 'LB', name: 'Lebanon' },
      { code: 'LT', name: 'Lithuania' },
      { code: 'LU', name: 'Luxembourg' },
      { code: 'MY', name: 'Malaysia' },
      { code: 'MT', name: 'Malta' },
      { code: 'MX', name: 'Mexico' },
      { code: 'MC', name: 'Monaco' },
      { code: 'ME', name: 'Montenegro' },
      { code: 'MA', name: 'Morocco' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'AN', name: 'Netherlands Antilles' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'ND', name: 'Northern Ireland' },
      { code: 'NO', name: 'Norway' },
      { code: 'PE', name: 'Peru' },
      { code: 'PL', name: 'Poland' },
      { code: 'PT', name: 'Portugal' },
      { code: 'RO', name: 'Romania' },
      { code: 'RU', name: 'Russian Federation' },
      { code: 'LC', name: 'Saint Lucia' },
      { code: 'SA', name: 'Saudi Arabia' },
      { code: 'RS', name: 'Serbia' },
      { code: 'SG', name: 'Singapore' },
      { code: 'SK', name: 'Slovakia' },
      { code: 'SI', name: 'Slovenia' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'ES', name: 'Spain' },
      { code: 'SE', name: 'Sweden' },
      { code: 'CH', name: 'Switzerland' },
      { code: 'TW', name: 'Taiwan' },
      { code: 'TH', name: 'Thailand' },
      { code: 'TT', name: 'Trinidad and Tobago' },
      { code: 'TR', name: 'Turkey' },
      { code: 'UA', name: 'Ukraine' },
      { code: 'AE', name: 'United Arab Emirates' },
      { code: 'UY', name: 'Uruguay' },
      { code: 'VE', name: 'Venezuela' }
    ];
    

    // const select = document.querySelector('.header__select');
    // const selectedFlag = document.getElementById('selectedFlag');
    // const dropdown = document.querySelector('.header__dropdown');
    const button = document.getElementById('countryButton');
    const input = document.getElementById('countryInput');

    // selectedFlag.style.display = 'none';

    function createOption(country) {
      const flagSrc = `/imgs/header/flags/${country.code.toLowerCase()}.png`;
      
      return `
        <li class="select__option" data-id="${country.code}">
          <img src="${flagSrc}" alt="${country.name}" class="flag__img">${country.name}
        </li>
      `;
    }

    // function dropdownSearch(filtered) {
    //   dropdown.innerHTML = '';
    //   filtered.forEach(country => {
    //     dropdown.insertAdjacentHTML('beforeend', createOption(country))
    //   });
    // }

    // button.addEventListener('click', () => {
    //   dropdown.classList.toggle('open');
    //   if (dropdown.children.length === 0) {
    //     countries.forEach(country => {
    //       dropdown.insertAdjacentHTML('beforeend', createOption(country));
    //     });
    //   }
    // });

    // dropdown.addEventListener('click', async e => {
    //   const option = e.target.closest('.select__option');
    //   if (option) {
    //     const countryName = option.textContent.trim();
    //     const selectedCountry = countries.find(
    //       country => country.name === countryName
    //     );

    //     selectedFlag.style.display = 'block';
    //     selectedFlag.src = `/imgs/header/flags/${selectedCountry.code.toLowerCase()}.png`;
    //     selectedFlag.alt = selectedCountry.name;
    //     select.classList.remove('open');

    //     const countryCode = e.target.dataset.id;
    //     const countryQuery = countryCode.toLowerCase();
    //     eventsApiService.countryCode = selectedCountry.code;
    //     eventsApiService.page = 0;

    //       console.log(countryQuery);

    //     clearEventsList();
    //     clearPagination();
    //     await renderEvent({countryQuery})
    //   }
    // });

    // input.addEventListener('input', e => {
    //   const search = e.target.value.toLowerCase()
    //   const filtered = countries.filter(country =>
    //     country.name.toLowerCase().includes(search)
    //   );

    //   dropdownSearch(filtered)
    // })

    // window.addEventListener('click', () => {
    //   dropdown.classList.remove('open');
    // });

  } catch (error) {
    console.error(error);
  }
}

renderCountries();

