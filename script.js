// Estado do jogo
let gameState = {
    currentOrganIndex: 0,
    currentQuestionIndex: 0,
    score: 0,
    isQuestionActive: false,
    gameCompleted: false
};

// Elementos DOM
let elements = {};

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeGame();
    setupEventListeners();
});

function initializeElements() {
    elements = {
        organContainer: document.querySelector('.organ-container'),
        foodCharacter: document.getElementById('food'),
        currentOrganSpan: document.getElementById('current-organ'),
        scoreSpan: document.getElementById('score'),
        organTitle: document.getElementById('organ-title'),
        organDescription: document.getElementById('organ-description'),
        organImageContainer: document.getElementById('organ-image-container'),
        enzymes: document.getElementById('enzymes'),
        questionPanel: document.getElementById('question-panel'),
        questionText: document.getElementById('question-text'),
        options: document.getElementById('options'),
        feedback: document.getElementById('feedback'),
        nextBtn: document.getElementById('next-btn'),
        restartBtn: document.getElementById('restart-btn'),
        victoryModal: document.getElementById('victory-modal'),
        errorModal: document.getElementById('error-modal'),
        errorMessage: document.getElementById('error-message'),
        playAgainBtn: document.getElementById('play-again-btn'),
        tryAgainBtn: document.getElementById('try-again-btn')
    };
}

function initializeGame() {
    gameState.currentOrganIndex = 0;
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    gameState.isQuestionActive = false;
    gameState.gameCompleted = false;
    
    createOrgans();
    updateGameDisplay();
    positionFood();
}

function createOrgans() {
    elements.organContainer.innerHTML = '';
    
    gameData.organs.forEach((organ, index) => {
        const organElement = document.createElement('div');
        organElement.className = `organ ${organ.id}`;
        organElement.textContent = organ.name;
        organElement.dataset.organId = organ.id;
        organElement.dataset.index = index;
        
        if (index === 0) {
            organElement.classList.add('current');
        }
        
        organElement.addEventListener('click', () => handleOrganClick(index));
        
        elements.organContainer.appendChild(organElement);
    });
}

function handleOrganClick(organIndex) {
    if (gameState.isQuestionActive || gameState.gameCompleted) return;
    
    // Verifica se é o órgão correto
    if (organIndex === gameState.currentOrganIndex) {
        const currentOrgan = gameData.organs[gameState.currentOrganIndex];
        showQuestion(currentOrgan);
    } else {
        showError('Clique no órgão correto destacado em dourado!');
    }
}

function showQuestion(organ) {
    gameState.isQuestionActive = true;
    elements.questionPanel.style.display = 'block';
    
    // Seleciona a pergunta atual ou a primeira se não houver índice
    const question = organ.questions[gameState.currentQuestionIndex] || organ.questions[0];
    
    elements.questionText.textContent = question.text;
    elements.feedback.innerHTML = '';
    elements.feedback.className = 'feedback';
    
    // Criar opções
    elements.options.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => handleAnswerClick(option, question, optionElement));
        elements.options.appendChild(optionElement);
    });
    
    elements.nextBtn.disabled = true;
}

function handleAnswerClick(selectedAnswer, question, optionElement) {
    if (!gameState.isQuestionActive) return;
    
    // Desabilitar todas as opções
    const allOptions = elements.options.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.textContent === question.correct_answer) {
            opt.classList.add('correct');
        } else if (opt !== optionElement) {
            opt.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === question.correct_answer) {
        optionElement.classList.add('correct');
        gameState.score += 10;
        elements.feedback.innerHTML = `✅ Correto! ${question.explanation || 'Muito bem!'}`;
        elements.feedback.classList.add('correct');
        
        setTimeout(() => {
            checkForNextQuestion();
        }, 3000);
    } else {
        optionElement.classList.add('incorrect');
        elements.feedback.innerHTML = `❌ Incorreto. A resposta correta é: ${question.correct_answer}. ${question.explanation || ''}`;
        elements.feedback.classList.add('incorrect');
        
        setTimeout(() => {
            gameState.isQuestionActive = false;
            elements.questionPanel.style.display = 'none';
            // Permitir tentar novamente
        }, 4000);
    }
    
    updateScore();
}

function checkForNextQuestion() {
    const currentOrgan = gameData.organs[gameState.currentOrganIndex];
    
    // Verifica se há mais perguntas para este órgão
    if (gameState.currentQuestionIndex + 1 < currentOrgan.questions.length) {
        gameState.currentQuestionIndex++;
        gameState.isQuestionActive = false;
        elements.questionPanel.style.display = 'none';
        // Permite fazer a próxima pergunta
    } else {
        // Todas as perguntas deste órgão foram respondidas, move para o próximo órgão
        moveToNextOrgan();
    }
}

function moveToNextOrgan() {
    const currentOrganElement = document.querySelector(`.organ[data-index="${gameState.currentOrganIndex}"]`);
    currentOrganElement.classList.remove('current');
    currentOrganElement.classList.add('completed');
    
    gameState.currentOrganIndex++;
    gameState.currentQuestionIndex = 0; // Reset para o próximo órgão
    gameState.isQuestionActive = false;
    elements.questionPanel.style.display = 'none';
    
    if (gameState.currentOrganIndex >= gameData.organs.length) {
        // Jogo completo
        gameState.gameCompleted = true;
        showVictoryModal();
    } else {
        // Próximo órgão
        const nextOrganElement = document.querySelector(`.organ[data-index="${gameState.currentOrganIndex}"]`);
        nextOrganElement.classList.add('current');
        
        updateGameDisplay();
        animateFoodMovement();
    }
}

function animateFoodMovement() {
    const currentOrganElement = document.querySelector(`.organ[data-index="${gameState.currentOrganIndex}"]`);
    const organRect = currentOrganElement.getBoundingClientRect();
    const containerRect = elements.organContainer.getBoundingClientRect();
    
    elements.foodCharacter.classList.add('moving');
    
    // Calcular posição relativa
    const newTop = organRect.top - containerRect.top + organRect.height / 2 - 30;
    const newLeft = organRect.left - containerRect.left + organRect.width / 2 - 30;
    
    elements.foodCharacter.style.top = `${newTop}px`;
    elements.foodCharacter.style.left = `${newLeft}px`;
    
    setTimeout(() => {
        elements.foodCharacter.classList.remove('moving');
    }, 800);
}

function positionFood() {
    setTimeout(() => {
        const firstOrgan = document.querySelector('.organ[data-index="0"]');
        if (firstOrgan) {
            const organRect = firstOrgan.getBoundingClientRect();
            const containerRect = elements.organContainer.getBoundingClientRect();
            
            const top = organRect.top - containerRect.top + organRect.height / 2 - 30;
            const left = organRect.left - containerRect.left + organRect.width / 2 - 30;
            
            elements.foodCharacter.style.top = `${top}px`;
            elements.foodCharacter.style.left = `${left}px`;
        }
    }, 100);
}

function updateGameDisplay() {
    const currentOrgan = gameData.organs[gameState.currentOrganIndex];
    
    elements.currentOrganSpan.textContent = currentOrgan.name;
    elements.organTitle.textContent = currentOrgan.name;
    elements.organDescription.textContent = currentOrgan.description;
    
    // Atualizar imagem do órgão
    elements.organImageContainer.innerHTML = '';
    const organImage = document.createElement('img');
    organImage.src = `assets/images/organ_${currentOrgan.id}.png`;
    organImage.alt = currentOrgan.name;
    organImage.onerror = function() {
        // Se a imagem não carregar, mostra um ícone padrão
        this.style.display = 'none';
        const iconDiv = document.createElement('div');
        iconDiv.textContent = '🫁';
        iconDiv.style.fontSize = '2rem';
        elements.organImageContainer.appendChild(iconDiv);
    };
    elements.organImageContainer.appendChild(organImage);
    
    if (currentOrgan.enzymes && currentOrgan.enzymes.length > 0) {
        elements.enzymes.innerHTML = `<strong>Enzimas:</strong> ${currentOrgan.enzymes.join(', ')}`;
        elements.enzymes.style.display = 'block';
    } else {
        elements.enzymes.style.display = 'none';
    }
}

function updateScore() {
    elements.scoreSpan.textContent = `Pontuação: ${gameState.score}`;
}

function showVictoryModal() {
    elements.victoryModal.style.display = 'flex';
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorModal.style.display = 'flex';
}

function hideModals() {
    elements.victoryModal.style.display = 'none';
    elements.errorModal.style.display = 'none';
}

function restartGame() {
    hideModals();
    initializeGame();
}

function setupEventListeners() {
    elements.nextBtn.addEventListener('click', () => {
        if (!gameState.isQuestionActive && !gameState.gameCompleted) {
            const currentOrgan = gameData.organs[gameState.currentOrganIndex];
            showQuestion(currentOrgan);
        }
    });
    
    elements.restartBtn.addEventListener('click', restartGame);
    elements.playAgainBtn.addEventListener('click', restartGame);
    elements.tryAgainBtn.addEventListener('click', hideModals);
    
    // Fechar modais clicando fora
    elements.victoryModal.addEventListener('click', (e) => {
        if (e.target === elements.victoryModal) {
            hideModals();
        }
    });
    
    elements.errorModal.addEventListener('click', (e) => {
        if (e.target === elements.errorModal) {
            hideModals();
        }
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', () => {
        setTimeout(positionFood, 100);
    });
}

// Funcionalidades adicionais para melhorar a experiência

// Adicionar efeitos sonoros (simulados com vibração em dispositivos móveis)
function playSuccessSound() {
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function playErrorSound() {
    if (navigator.vibrate) {
        navigator.vibrate([200]);
    }
}

// Adicionar suporte a teclado
document.addEventListener('keydown', (e) => {
    if (gameState.isQuestionActive) {
        const options = elements.options.querySelectorAll('.option');
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            if (options[optionIndex]) {
                options[optionIndex].click();
            }
        }
    }
    
    if (e.key === 'Enter' && !gameState.isQuestionActive && !gameState.gameCompleted) {
        elements.nextBtn.click();
    }
    
    if (e.key === 'Escape') {
        hideModals();
    }
    
    if (e.key === 'r' || e.key === 'R') {
        restartGame();
    }
});

// Adicionar tooltips informativos
function addTooltips() {
    const organs = document.querySelectorAll('.organ');
    organs.forEach((organ, index) => {
        organ.title = gameData.organs[index].description;
    });
}

// Salvar progresso no localStorage
function saveProgress() {
    localStorage.setItem('digestiveGameProgress', JSON.stringify({
        currentOrganIndex: gameState.currentOrganIndex,
        currentQuestionIndex: gameState.currentQuestionIndex,
        score: gameState.score,
        timestamp: Date.now()
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('digestiveGameProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        // Carregar apenas se foi salvo nas últimas 24 horas
        if (Date.now() - progress.timestamp < 24 * 60 * 60 * 1000) {
            gameState.currentOrganIndex = progress.currentOrganIndex;
            gameState.currentQuestionIndex = progress.currentQuestionIndex || 0;
            gameState.score = progress.score;
            return true;
        }
    }
    return false;
}

// Adicionar modo de dicas
function showHint() {
    const currentOrgan = gameData.organs[gameState.currentOrganIndex];
    const hint = `Dica: ${currentOrgan.description}`;
    
    const hintElement = document.createElement('div');
    hintElement.className = 'hint-popup';
    hintElement.textContent = hint;
    hintElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4299e1;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        max-width: 300px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(hintElement);
    
    setTimeout(() => {
        document.body.removeChild(hintElement);
    }, 3000);
}

// Adicionar estatísticas do jogo
function getGameStats() {
    const totalQuestions = gameData.organs.reduce((total, organ) => total + organ.questions.length, 0);
    const correctAnswers = Math.floor(gameState.score / 10);
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions * 100).toFixed(1) : 0;
    
    return {
        totalQuestions,
        correctAnswers,
        accuracy: `${accuracy}%`,
        score: gameState.score
    };
}

