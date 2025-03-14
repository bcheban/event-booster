// fetch('https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=omMBLoghFvSK3obRhAEGVULijGKYdOPI')

// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log(error))

const getEventApi = async (keyword) => {
  if (keyword === "" || keyword === undefined || keyword === null){
      try {
          const result = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=RKwTp5P44ztFFCbPCDFoxyCASf3hPfPS&size=20&page=5`).then((data) => {
              return data.json();
          });
          return result;
      } catch (error) {
          return error;
      }
  } else {
      try {
          const result = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=RKwTp5P44ztFFCbPCDFoxyCASf3hPfPS&size=20&page=5&keyword=${keyword}`).then((data) => {
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
  createMarkup(data._embedded)
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

// for (let index = 0; index < 20; index++) {
//   main.innerHTML += `
//   <div class="card">
//               <img src="images/Rectangle 6.png" alt="" class="card-img">
//               <div class="card-deco">
//               <h2 class="card-name">Eurovision 2021 finals!</h2>
//               <h3 class="card-date">2021-05-13</h3>
//               <p class="card-location__name">Palace of Ukraine</p>
//   </div>
//   `
  
// }

// template for adaptive - end


// script for modal - start 
const cards = document.querySelectorAll(".card")
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");
console.log(cards)
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

