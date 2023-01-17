const grid = document.querySelector('.grid');
const span = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
]

let firstCard = '';
let secondCard = '';

const startTimer = () => {
    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 20) {
        clearInterval(loop);
        setTimeout(() => {
            alert(`Parabéns, ${span.innerHTML}, você venceu o jogo em ${timer.innerHTML} segundos!`);
        }, 500);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('character'); 
    const secondCharacter = secondCard.getAttribute('character'); 

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    }
    else {

        setTimeout( () => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
            
        },500)
 
    }
}

const revealCard = ( { target } ) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if(firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }
    else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}


const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../img/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('character', character);

    return card;
}

const loadGame = () => {

    const duplicatedCharacters = [...characters, ...characters]

    const shuffledArray = duplicatedCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

window.onload = () => {
    span.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
}



