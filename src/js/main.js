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

function openModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
}

// Close modal when clicking on close button
document.querySelector(".modal-close").addEventListener("click", closeModal);

// Close modal when clicking outside of it
overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
        closeModal();
    }
});

// Open modal when clicking on any card
cards.forEach((card) => {
    card.addEventListener("click", openModal);
});

// script for modal - end 