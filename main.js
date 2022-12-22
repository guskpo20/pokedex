const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
const pokemonImg =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

const pokemonInfo = 'https://pokeapi.co/api/v2/pokemon-form/1/';
// .types -> me devuelve el tipo del pokemon
const typesImgs = 'https://veekun.com/dex/media/types/en/bug.png';
//imagenes de los tipos

async function getPokemons() {
  let data = await fetch(pokemonsUrl);
  data = await data.json();
  return data.results;
}

function clearPokemonInfo() {
  let container = document.getElementsByClassName('pokemon')[0];
  container.innerHTML = `
    <h2 id="pokemonTitle">Toca un pokemon!</h2>
    <p>Al tocar un pokemon, aqui aparecera toda su informacion</p>
    `;
}

async function makePokedex() {
  const data = await getPokemons();
  const container = document.getElementsByClassName('pokemons')[0];
  let i = 1;
  for (const pokemon of data) {
    container.innerHTML += `
        <div id=${pokemon.name} class="pokemon-card">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png">
        <p>${pokemon.name}</p>
        </div>
    `;
    i++;
  }
  console.log(data);
  setOnClicks();
}

async function setPokemonInfo(name) {
  //  https://pokeapi.co/api/v2/pokemon/${name}/
}

function setOnClicks() {
  let pokemonsCards = document.getElementsByClassName('pokemon-card');
  for (const pokemonCard of pokemonsCards) {
    let pokemon = pokemonCard.id;
    pokemonCard.addEventListener('click', () => {
      console.log(pokemon);
      //setPokemonInfo(pokemon)
    });
  }
}
clearPokemonInfo();
makePokedex();
