const offset= 0
const limit = 10
const url = `view-source:https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`


/*O Fetch é um processamento assínncrono, ou seja, ele pode não te fornecer uma reposta imediata. Mas fornece. Essa função interpreta a resposta, para que possamos manipular a resposta*/
/*Catch é usado para descrever uma função que fracassou, e finally, independente do sucesso ou fracasso, descreve a conclusão da requisição.*/

/* A junção de Fetch+Catch+Finally é uma interface de uma promisse, e é parecida com o que se vê na estrutura de comunicação e é chamado de try catch*/

/*ArrowFunction: Sintaxe reduzida, definição de uma função simbolizado por => no lugar da function, quando usado, não é preciso declarar o corpo da função (return), reduzindo a função para uma linha */

function convertPokemonToLi (pokemon){
    return `
    <li class="pokemon">
    <span class="number">#001</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
        <ol class="types">
            <li class="type">Grass</li>
            <li class="type">Poison</li>
        </ol>

     <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt=${pokemon.name}>   
    </div>
    
</li>
`
}

const pokemonList = document.getElementById('pokemonList')

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results) 
    .then((pokemons) => {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        pokemonList.innerHTML += convertPokemonToLi(pokemon)
    }
  
    })
    .catch((error) => console.log(error))

