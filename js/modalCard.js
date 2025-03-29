export default function modalMarkUp(event) {
    const imgUrl = event.images[2]?.url || '';
    const originalDescription = event.info || event.description || 'No description available';
    const description = truncateDescription(originalDescription);

    const date = event.dates.start.localDate || 'Unknown Date';
    const time = formatTime(event.dates.start.localTime);
    const location = event._embedded.venues[0]?.name || 'Unknown Location';
    const city = event._embedded.venues[0]?.city.name || '';
    const country = event._embedded.venues[0]?.country.name || '';
    const artist = event.name || 'No name available';

    const priceRanges = event.priceRanges || [];
    const standardPrice = priceRanges.find(price => price.type === 'standard') || '';
    const vipPrice = priceRanges.find(price => price.type === 'vip') || '';
    const standardMin = Math.round(standardPrice.min);
    const standardMax = Math.round(standardPrice.max);
    const vipMin = Math.round(vipPrice.min);
    const vipMax = Math.round(vipPrice.max);
    const moreAuthorUrl = `https://www.ticketmaster.com/search?q=${encodeURIComponent(artist)}`;


    const ticketSvg = `
    <svg class="modal__ticket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 17" fill="none">
    <path d="M2.66668 0.833496L0 0.833496L0 16.8335H2.66668L2.66668 0.833496Z" fill="#0E0E0E" />
    <path d="M9.3737 0.833496L6.70703 0.833496L6.70703 16.8335H9.3737L9.3737 0.833496Z" fill="#0E0E0E" />
    <path d="M13.4142 0.833496L10.7476 0.833496L10.7476 16.8335H13.4142L13.4142 0.833496Z" fill="#0E0E0E" />
    <path d="M24.0001 0.833496L20.0405 0.833496L20.0405 16.8335H24.0001L24.0001 0.833496Z" fill="#0E0E0E" />
    <path d="M5.33334 0.833496L4.04041 0.833496L4.04041 16.8335H5.33334L5.33334 0.833496Z" fill="#0E0E0E" />
    <path d="M16 0.833496L14.707 0.833496L14.707 16.8335H16L16 0.833496Z" fill="#0E0E0E" />
    <path d="M18.6666 0.833496L17.3737 0.833496L17.3737 16.8335H18.6666L18.6666 0.833496Z" fill="#0E0E0E" />
    </svg>`;

    const standardBox = standardPrice ? `
        <p class="modal__text modal__text-ticket ">
        ${ticketSvg} Standart ${standardMin}-${standardMax} ${standardPrice.currency}
        </p>
        <button class="modal__buy-btn">BUY TICKETS</button>`
        :
        `<p class="modal__text modal__text-ticket" style="margin-bottom: 20px;">
        ${ticketSvg} Standart tickets are not available
        </p>`;

    const vipBox = vipPrice ? `
        <p class="modal__text modal__text-ticket">
        ${ticketSvg} VIP ${vipMin}-${vipMax} ${vipPrice.currency}
        </p>
        <button class="modal__buy-btn">BUY TICKETS</button>` :
        `<p class="modal__text modal__text-ticket">
        ${ticketSvg} VIP tickets are not available
        </p>`;

    function formatTime(timeString) {
        if (!timeString) return 'Unknown Time';
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    }

    function truncateDescription(text, maxLines = 3, maxLineLength = 30) {
        if (!text) return text;

        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.map(word => {
            if (lines.length < maxLines) {
                if ((currentLine + word).length > maxLineLength) {
                    lines.push(currentLine.trim());
                    currentLine = word + ' ';
                } else {
                    currentLine += word + ' ';
                }
            }
        });

        if (lines.length < maxLines && currentLine.trim()) {
            lines.push(currentLine.trim());
        }

        return lines.length >= maxLines ? lines.slice(0, maxLines).join(' ') + '...' : text;
    }

    return `
    <div class="modal">
        <button type="button" class="modal__btn-close" >
            <svg class="modal__icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" >
                <path d="M0.874187 17C0.65025 17 0.426313 16.9148 0.256172 16.7434C-0.0853907 16.4019 -0.0853907 15.8481 0.256172 15.5066L15.5069 0.256166C15.8485 -0.0853885 16.4023 -0.0853885 16.7438 0.256166C17.0854 0.59772 17.0854 1.15146 16.7438 1.49323L1.49327 16.7434C1.32185 16.9138 1.09791 17 0.874187 17Z" />
                <path d="M16.126 17C15.9021 17 15.6784 16.9148 15.508 16.7434L0.256172 1.49323C-0.0853907 1.15146 -0.0853907 0.59772 0.256172 0.256166C0.597735 -0.0853885 1.15149 -0.0853885 1.49327 0.256166L16.7438 15.5066C17.0854 15.8481 17.0854 16.4019 16.7438 16.7434C16.5724 16.9138 16.3487 17 16.126 17Z" />
            </svg>
        </button>

        <img src="${imgUrl}" alt="${artist}" class="modal__img" />

        <div class="modal__box">
            <img src="${imgUrl}" alt="${artist}" class="modal__main-img" />

            <div class="modal__info">
                <h4 class="modal__title">INFO</h4>
                <p class="modal__text">${description}</p>

                <h4 class="modal__title">WHEN</h4>
                <p class="modal__text modal__text--none">${date}</p>
                <p class="modal__text">${time} (${city}/${country})</p>

                <h4 class="modal__title">WHERE</h4>
                <p class="modal__text modal__text--none">${location}</p>
                <p class="modal__text">${city}, ${country}</p>

                <h4 class="modal__title">WHO</h4>
                <p class="modal__text">${artist}</p>

                <h4 class="modal__title">PRICES</h4>
                ${standardBox}
                ${vipBox}
            </div>
        </div>
        <button class="modal__more-btn" onclick="window.open('${moreAuthorUrl}', '_blank')">MORE FROM THIS AUTHOR</button>
        </div>
`;
}
