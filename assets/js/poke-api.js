const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url).then((response) => response.json())
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
