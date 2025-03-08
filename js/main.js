// Отримання списку країн з API Ticketmaster
async function getCountriesFromTicketmaster() {
    const apiKey = 'YOUR_API_KEY'; // Замініть на свій API ключ
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=200`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Створення набору унікальних країн
      const countries = new Set();
      
      if (data._embedded && data._embedded.events) {
        data._embedded.events.forEach(event => {
          if (event._embedded && event._embedded.venues) {
            event._embedded.venues.forEach(venue => {
              if (venue.country && venue.country.name && venue.country.countryCode) {
                // Додаємо країну у формат для дропдауну
                countries.add({
                  name: venue.country.name,
                  code: venue.country.countryCode
                });
              }
            });
          }
        });
      }
      
      // Перетворення Set в масив об'єктів для дропдауну
      return Array.from(countries).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Помилка при отриманні даних країн:', error);
      return [];
    }
  }

// Створення дропдауну з країнами
async function createCountryDropdown() {
    const countries = await getCountriesFromTicketmaster();
    
    const select = document.getElementById('countrySelect'); // ID вашого select елемента
    
    // Додавання опції "Всі країни"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Всі країни';
    select.appendChild(defaultOption);
    
    // Додавання країн у дропдаун
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
  }

  function searchEvents() {
    const countryCode = document.getElementById('countrySelect').value;
    const apiKey = 'YOUR_API_KEY';
    
    // Додаємо параметр countryCode, якщо вибрано конкретну країну
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;
    if (countryCode) {
      url += `&countryCode=${countryCode}`;
    }
    
    // Подальший код для обробки відповіді...
  }
// template for adaptive - start

const main = document.querySelector('.main')

for (let index = 0; index < 20; index++) {
    main.innerHTML += `
    <div class="card">
                <img src="/src/images/Rectangle 6.png" alt="" class="card-img">
                <div class="card-deco">
                <h2 class="card-name">Eurovision 2021 finals!</h2>
                <h3 class="card-date">2021-05-13</h3>
                <p class="card-location__name">Palace of Ukraine</p>
    </div>
    `
    
}

// template for adaptive - end


// script for modal - start 
const cards = document.querySelectorAll('.card');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");

function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
}
closeModal()
function openModal() {
    modal.style.display = "flex";
    overlay.style.display = "flex";
}


document.querySelector(".modal-close").addEventListener("click", closeModal);

overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
        closeModal();
    }
});

cards.forEach((card) => {
    card.addEventListener("click", openModal);
});

// script for modal - end 

