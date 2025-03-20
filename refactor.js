// Verificação do número de inscritos via API
async function fetchSubscriberCount() {
    const channelId = 'UCfTXtop2YQ3yF6UJmlxP-RQ';  // Channel ID
    const apiKey = 'AIzaSyCwib6x3P0MHvQPt7MkVRUOpE3e-W3lAgw'; //Key da API
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro na requisição');

        const data = await response.json();
        console.log(data);  // Exibe a resposta da API no console

        if (data.items && data.items.length > 0) {
            const subscriberCount = data.items[0].statistics.subscriberCount;
            document.getElementById('subscriber-count').textContent = `Inscritos: ${subscriberCount}`;
        } else {
            throw new Error('Canal não encontrado ou erro na API');
        }
    } catch (error) {
        document.getElementById('subscriber-count').textContent = 'Erro ao carregar inscritos';
        console.error('Erro ao obter dados da API do YouTube:', error);
    }
}

// Chama a função ao carregar a página
window.onload = fetchSubscriberCount;

let index = 0;
let direction = 1; // 1 para avançar, -1 para voltar
const totalImages = document.querySelectorAll(".carousel img").length;

function showNextImage() {
    const carousel = document.querySelector(".carousel");
    const dots = document.querySelectorAll(".dot");

    // Alterna a direção ao chegar na última ou primeira imagem
    if (index === totalImages - 1) {
        direction = -1; // Começa a voltar
    } else if (index === 0) {
        direction = 1; // Começa a avançar
    }

    index += direction; // Atualiza o índice

    const offset = index * 293.5; // Move na largura exata da imagem
    carousel.style.transform = `translateX(-${offset}px)`; // Aplica o deslocamento suave

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// Define um intervalo para avançar/retroceder automaticamente
setInterval(showNextImage, 3000);

