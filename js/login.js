const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');


//validando se o input ''nome'' foi escrito ou não
const validateInput = ({target}) => {
    if(target.value.length >= 1) {
        button.removeAttribute('disabled');
        return;
    }
    
    button.setAttribute('disabled','');
    
}

//jogador indo para a pagina do jogo apos preencher o nome e ir para o submit
const nextPageSubmit = (event) => 
{
    event.preventDefault(); //não deixa o form recarregar
    localStorage.setItem('player', input.value); //salvando o nome do jogador no localStorage da page
    window.location = 'pages/game.html'; //redirecionando para a nova pagina
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', nextPageSubmit);