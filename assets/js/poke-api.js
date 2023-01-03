const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) // Isso chama-se equivalência. Conceito mais avançado à se estudar.
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons =(offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json()) // conversão da lista de pokemons para json
        .then((jsonBody) => jsonBody.results) //nova lista em json, completo e cheio de detalhes
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))// transformação da nova lista json em lista de promise's (fetch) + tratamento do resultado em response, para convertê-la em json
        .then((detailRequests) => Promise.all(detailRequests)) //Resolução dessa lista, e esperamos que todas as requisições terminem
        .then((pokemonsDetails) => pokemonsDetails)
}
