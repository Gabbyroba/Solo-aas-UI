// Função para buscar um programa solo na API
const apiURL = "https://soloaas.onrender.com/solo_todo";


function calcularDistancia(lat1, lon1, lat2, lon2) {
    const raioTerra = 6371; 

    // Converte graus em radianos
    const lat1Rad = (Math.PI / 180) * lat1;
    const lon1Rad = (Math.PI / 180) * lon1;
    const lat2Rad = (Math.PI / 180) * lat2;
    const lon2Rad = (Math.PI / 180) * lon2;

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distância em quilômetros
    const distancia = raioTerra * c;

    return distancia;
}

async function buscarProgramaSolo() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Não foi possível obter um programa solo.');
        }
        const data = await response.json();
        const respostaSoloTodo = document.getElementById('resposta-solo-todo');
        respostaSoloTodo.textContent = data.program;

        // Obter localização do Usuário
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Cria um mapa usando Leaflet.js e OpenStreetMap
                const mapa = L.map('mapa').setView([latitude, longitude], 12); // Ajuste o nível de zoom conforme necessário

                // Adiciona um mapa do OpenStreetMap ao seu mapa
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapa);

                // Cria um círculo no mapa com um raio de 2 km
                L.circle([latitude, longitude], {
                    color: 'fuchsia',
                    fillColor: 'fuchsia',
                    fillOpacity: 0.2,
                    radius: 2000 // 2 km em metros
                }).addTo(mapa);
            });
        } else {
            console.error('O navegador não suporta geolocalização.');
        }
    } catch (error) {
        console.error('Erro ao buscar programa solo:', error);
        const respostaSoloTodo = document.getElementById('resposta-solo-todo');
        respostaSoloTodo.textContent = 'Erro ao buscar programa solo. Tente novamente mais tarde.';
    }
}

// Adiciona um evento de clique ao botão "Bora?" para buscar um programa solo
const botaoBora = document.getElementById('get-solo-aas');
botaoBora.addEventListener('click', buscarProgramaSolo);
