// fetch('https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=omMBLoghFvSK3obRhAEGVULijGKYdOPI')

// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log(error))
let page = 1;
const getEventApi = async (keyword) => {
  if (keyword === "" || keyword === undefined || keyword === null){
      try {
          const result = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=RKwTp5P44ztFFCbPCDFoxyCASf3hPfPS&size=20&page=${page}`).then((data) => {
              return data.json();
          });
          return result;
      } catch (error) {
          return error;
      }
  } else {
      try {
          const result = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=RKwTp5P44ztFFCbPCDFoxyCASf3hPfPS&size=20&page=${page}&keyword=${keyword}`).then((data) => {
              return data.json();
          });
          return result;
      } catch (error) {
          return error;
      }
  }
};
// api - end
getEventApi()
getEventApi().then((data) => {
  if (data._embedded) {
    createMarkup(data._embedded);
  }
});
// show card - start
const list = document.querySelector(".main");

function createMarkup(arr) {
  console.log(arr)
  const html = arr.events.map((item) => {
      return `<div class="card">
                   <img class="card-img" src="${item.images[0].url}" alt="poster"/>
                   <h2 class="card-name">${item.name}</h2>
<span class="card-location__name">${item.locale}</span>
                 </div>`
;
                 
  }).join("");

  list.innerHTML = html;
  const cards = document.querySelectorAll(".card")
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");

const modalLogo = document.querySelector(".modal-logo");
const modalPoster = document.querySelector(".modal-poster")
console.log(cards)
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

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
  card.addEventListener("click", function(){
    modalLogo.src = card.firstElementChild.src
    modalPoster.src = card.firstElementChild.src
    openModal()
  });
});
}
function searcPost() {
  const keyWord = searcInput.value;

  getEventApi(keyWord).then((data) => {
      createMarkup(data._embedded)
  });
}
const searcInput = document.querySelector(".header-searches__ticket");

searcInput.addEventListener("input", _.debounce(() => {
  searcPost()
}, 500));

const main = document.querySelector('.main')

const paginationPage = document.querySelectorAll(".footer-pagination-page")

paginationPage.forEach((element) => {
  element.addEventListener('click', (index) => {
    paginationPage.forEach(element => {
      element.classList.remove('active-page')
      
    });
    element.classList.add('active-page')
    page = element.textContent
    getEventApi(searcInput.value).then((data) => {
      createMarkup(data._embedded)
  });
  })
});

