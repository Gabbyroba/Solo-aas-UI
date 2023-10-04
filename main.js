// Função para buscar um programa solo na API
const apiURL = "https://soloaas.onrender.com/solo_todo"

async function buscarProgramaSolo() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Não foi possível obter um programa solo.');
        }
        const data = await response.json();
        const respostaSoloTodo = document.getElementById('resposta-solo-todo');
        respostaSoloTodo.textContent = data.program;
    } catch (error) {
        console.error('Erro ao buscar programa solo:', error);
        const respostaSoloTodo = document.getElementById('resposta-solo-todo');
        respostaSoloTodo.textContent = 'Erro ao buscar programa solo. Tente novamente mais tarde.';
    }
}

// Adicionar um evento de clique ao botão "Bora?" para buscar um programa solo
const botaoBora = document.getElementById('get-solo-aas');
botaoBora.addEventListener('click', buscarProgramaSolo);