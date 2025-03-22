async function fetchSubscriberCount() {
    const channelId = 'UCfTXtop2YQ3yF6UJmlxP-RQ';  // Channel ID
    const apiKey = 'AIzaSyCwib6x3P0MHvQPt7MkVRUOpE3e-W3lAgw'; // Key da API
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro na requisição');

        const data = await response.json();
        console.log(data);  // Exibe a resposta da API no console

        if (data.items && data.items.length > 0) {
            const subscriberCount = parseInt(data.items[0].statistics.subscriberCount, 10);
            startCounting(subscriberCount);
        } else {
            throw new Error('Canal não encontrado ou erro na API');
        }
    } catch (error) {
        document.getElementById('subscriber-count').textContent = 'Erro ao carregar inscritos';
        console.error('Erro ao obter dados da API do YouTube:', error);
    }
}

// Função para fazer a contagem progressiva até o número de inscritos
function startCounting(target) {
    const counter = document.querySelector('.counter');
    let count = 0;
    const speed = 10; // Velocidade do incremento (quanto menor, mais rápido)

    // Função para incrementar o contador
    const updateCounter = () => {
        if (count < target) {
            count++;
            counter.innerHTML = `Subscriber Count: ${count} <i class="bi bi-rocket-takeoff"></i>`; // Exibe a contagem com o ícone
            setTimeout(updateCounter, speed);
        } else {
            counter.innerHTML = `Subscriber Count: ${target} subs <i class="bi bi-rocket-takeoff"></i>`; // Exibe o número final com o ícone
        }
    };
    

    // Começa a contagem
    updateCounter();
}

var h1 = document.querySelector("h1");
var text = "Welcome, Gamer! DLucas YT is Your Next Stop"; // Texto a ser animado
var index = 0;

// Função para animar o texto
function typeText() {
    if (index < text.length) {
        h1.innerHTML += text.charAt(index);  // Adiciona um caractere por vez
        index++;
        setTimeout(typeText, 100);  // Chama a função novamente após 100ms
    }
}

// Chama ambas as funções ao carregar a página
window.onload = function() {
    fetchSubscriberCount(); // Chama o contador de inscritos
    typeText();             // Chama a animação do título
};


