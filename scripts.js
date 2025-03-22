async function fetchSubscriberCount() {
    const channelId = 'UCfTXtop2YQ3yF6UJmlxP-RQ';  // Channel ID (ID do canal)
    const apiKey = 'AIzaSyCwib6x3P0MHvQPt7MkVRUOpE3e-W3lAgw'; // API Key (Chave da API)
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error with the request'); // Erro na requisição

        const data = await response.json();
        console.log(data);  // Displays the API response in the console (Exibe a resposta da API no console)

        if (data.items && data.items.length > 0) {
            const subscriberCount = parseInt(data.items[0].statistics.subscriberCount, 10);
            startCounting(subscriberCount);
        } else {
            throw new Error('Channel not found or API error'); // Canal não encontrado ou erro na API
        }
    } catch (error) {
        document.getElementById('subscriber-count').textContent = 'Error loading subscriber count'; // Erro ao carregar a contagem de inscritos
        console.error('Error fetching YouTube API data:', error); // Exibe erro no console
    }
}

// Function to make a progressive count to the subscriber number (Função para contar progressivamente até o número de inscritos)
function startCounting(target) {
    const counter = document.querySelector('.counter');
    let count = 0;
    const speed = 10; // Speed of increment (Velocidade do incremento)

    // Function to increment the counter (Função para incrementar o contador)
    const updateCounter = () => {
        if (count < target) {
            count++;
            counter.innerHTML = `Subscriber Count: ${count} <i class="bi bi-rocket-takeoff"></i>`; // Shows count with icon (Exibe a contagem com o ícone)
            setTimeout(updateCounter, speed);
        } else {
            counter.innerHTML = `Subscriber Count: ${target} subs <i class="bi bi-rocket-takeoff"></i>`; // Shows the final number with icon (Exibe o número final com o ícone)
        }
    };
    
    // Starts the counting (Começa a contagem)
    updateCounter();
}

var h1 = document.querySelector("h1");
var text = "Welcome, Gamer! DLucas YT is Your Next Stop"; // Text to animate (Texto a ser animado)
var index = 0;

// Function to animate the text (Função para animar o texto)
function typeText() {
    if (index < text.length) {
        h1.innerHTML += text.charAt(index);  // Adds one character at a time (Adiciona um caractere por vez)
        index++;
        setTimeout(typeText, 100);  // Calls the function again after 100ms (Chama a função novamente após 100ms)
    } else {
        setTimeout(function() {
            h1.innerHTML = ""; // Clears the text (Limpa o texto)
            index = 0; // Resets the index to start over (Reinicia o índice para começar de novo)
            typeText(); // Calls the function again to restart the loop (Chama a função novamente para reiniciar o loop)
        }, 3000); // Waits 2 seconds before restarting (Aguarda 2 segundos antes de reiniciar)
    }
}

// Calls both functions when the page loads (Chama ambas as funções ao carregar a página)
window.onload = function() {
    fetchSubscriberCount(); // Calls the subscriber counter (Chama o contador de inscritos)
    typeText();             // Calls the title animation (Chama a animação do título)
};

/*bnt dark mode*/
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.createElement("button"); // Create the button (Cria o botão)
    toggleButton.id = "toggle-theme"; // Set an ID for the button (Define um ID para o botão)

    // Set the game controller icon as default (Define o ícone de controle de videogame como padrão)
    toggleButton.innerHTML = "<i class='fas fa-gamepad'></i>"; 

    // Add the button to the footer (Adiciona o botão ao rodapé)
    const footer = document.getElementById('footer');
    footer.appendChild(toggleButton); // Appends the button inside the footer (Adiciona o botão dentro do footer)

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode"); // Toggles between themes (Alterna entre os temas)

        // Updates the button icon based on the theme (Atualiza o ícone do botão de acordo com o tema)
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.innerHTML = "<i class='fas fa-gamepad'></i>"; // Joystick (for dark mode) (Joystick para o modo escuro)
        } else {
            toggleButton.innerHTML = "<i class='fas fa-gamepad'></i>"; // Game controller (for light mode) (Controle de videogame para o modo claro)
        }
    });
});
