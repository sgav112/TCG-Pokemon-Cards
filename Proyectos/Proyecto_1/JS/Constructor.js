import { Query_api } from './Llamado.js';

const url = 'https://api.pokemontcg.io/v2/cards';
const buscador = document.getElementById('buscador');
let boton = document.getElementById('boton');

let click = false;




buscador.addEventListener('keydown', async function(event) {
    boton.addEventListener('click', async function() {
        click = true;
        await searchCards();
    });

    if (event.key === 'Enter') {
        await searchCards();
    }
});

async function searchCards() {
    let busqueda = buscador.value;
    let cardName = String(busqueda).toUpperCase();
    let limit = 100;

    let queryUrl;
    if (cardName.trim() === "") {
        queryUrl = `${url}?pageSize=${limit}`;
    } else {
        queryUrl = `${url}?q=name:${cardName}`;
    }

    try {
        let respuesta = await Query_api(queryUrl);
        let sortedCards = respuesta.data.sort((a, b) => a.name.localeCompare(b.name));
        displayCards(sortedCards); // Llama a displayCards con los datos de la respuesta ordenados
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCards(cards) {
    const itemDiv = document.getElementById('carta');
    itemDiv.innerHTML = ''; // Clear previous results

    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.images.small;
        img.alt = card.name;
        itemDiv.appendChild(img);
    });
}
