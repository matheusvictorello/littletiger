const symbolImages = {
    'Tigre': 'https://br-se1.magaluobjects.com/littletiger/tigre.png',
    'Fruta': 'https://br-se1.magaluobjects.com/littletiger/fruta.png',
    'Estrela': 'https://br-se1.magaluobjects.com/littletiger/estrela.png'
};

let balance = localStorage.getItem('balance') !== null ? parseFloat(localStorage.getItem('balance')) : 10;  // Saldo inicial
let betAmount = 1;

// Atualiza o saldo no display
function updateBalanceDisplay() {
    document.getElementById('balance').textContent = `Saldo: R$${balance.toFixed(2)}`;
    localStorage.setItem('balance', balance);  // Salva o saldo no localstorage
}

// Atualiza o valor da aposta no display
function updateBetDisplay() {
    document.getElementById('currentBet').textContent = `Aposta atual: R$${betAmount.toFixed(2)}`;
}

const symbols = ['Tigre', 'Fruta', 'Estrela'];

// Função para sortear um símbolo aleatório
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Aumentar a aposta
document.getElementById('increaseBetButton').addEventListener('click', function() {
    if (betAmount < balance) {
        betAmount += 1;  // Aumenta a aposta em 1 real
        if (betAmount > balance) {
            betAmount = balance;  // Garante que a aposta não seja maior que o saldo disponível
        }
        updateBetDisplay();  // Atualiza a exibição da aposta
    }
});

// Diminuir a aposta
document.getElementById('decreaseBetButton').addEventListener('click', function() {
    if (betAmount > 1) {
        betAmount -= 1;  // Diminui a aposta em 1 real
    } else if (balance <= 1) {
        betAmount = balance;  // Permite apostar tudo se restar apenas 1 real ou menos
    }
    updateBetDisplay();  // Atualiza a exibição da aposta
});

document.getElementById('spinButton').addEventListener('click', function() {
    // Verifica se o saldo é menor que a aposta, mas permite a aposta se for igual
    if (balance < betAmount) {
        alert('Saldo insuficiente para essa aposta!');
        return;
    }

    // Desconta o valor da aposta, sem fazer a verificação antes de reduzir o saldo
    balance -= betAmount;
    updateBalanceDisplay();  // Atualiza o saldo

    const slotResults = [];

    // Inicia a animação de todos os slots
    for (let i = 1; i <= 9; i++) {
        const slotElement = document.getElementById(`slot${i}`);
        slotElement.classList.remove('stopped');  // Remove o estado de parada
        slotElement.classList.add('spinning');  // Adiciona a animação de giro contínuo
    }

    // Parar a rotação após 0.75 segundo e definir o símbolo final
    setTimeout(() => {
        for (let i = 1; i <= 9; i++) {
            const slotElement = document.getElementById(`slot${i}`);
            const slotInner = slotElement.querySelector('.slot-inner');

            // Sorteia o símbolo final para este slot
            const symbol = getRandomSymbol();

            // Para a rotação contínua e define a posição final do símbolo
            slotInner.style.transform = `translateY(-${symbols.indexOf(symbol) * 100}px)`;
            slotElement.classList.remove('spinning');  // Para a rotação
            slotElement.classList.add('stopped');  // Define o estado como parado
            slotResults.push(symbol);
        }

        // Verificar combinações vencedoras após todos os slots pararem
        setTimeout(() => {
            let totalMultiplier = 0;

            // Linhas vencedoras
            const winningCombos = [
                [slotResults[0], slotResults[1], slotResults[2]],
                [slotResults[3], slotResults[4], slotResults[5]],
                [slotResults[6], slotResults[7], slotResults[8]],
                [slotResults[0], slotResults[4], slotResults[8]],
                [slotResults[2], slotResults[4], slotResults[6]]
            ];

            // Verificar cada linha ou diagonal para ver se é uma combinação vencedora
            winningCombos.forEach(combo => {
                if (combo[0] === combo[1] && combo[1] === combo[2]) {
                    switch (combo[0]) {
                        case 'Tigre':
                            totalMultiplier += 3;  // Trinca de Tigres equivale a 3x
                            break;
                        case 'Fruta':
                            totalMultiplier += 1.5;  // Trinca de Frutas equivale a 1.5x
                            break;
                        case 'Estrela':
                            totalMultiplier += 1;  // Trinca de Estrelas equivale a 1x
                            break;
                    }
                }
            });

            // Calcula o valor ganho baseado no multiplicador
            const winnings = totalMultiplier * betAmount;  // Ganhos baseados na aposta e no multiplicador
            balance += winnings;  // Adiciona os ganhos ao saldo
            updateBalanceDisplay();  // Atualiza o saldo na tela

            // Exibir o resultado
            const resultText = totalMultiplier > 0 
                ? `Você ganhou ${totalMultiplier}x! Seus ganhos: R$${winnings.toFixed(2)}` 
                : 'Tente novamente!';
            document.getElementById('result').textContent = resultText;
        }, 200);  // Espera um pouco para exibir o resultado após todos os slots pararem
    }, 750);  // A rotação contínua acontece por 0.75 segundos antes de parar
});

// Inicializa o saldo ao carregar a página
updateBalanceDisplay();
updateBetDisplay();
