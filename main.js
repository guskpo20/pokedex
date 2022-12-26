const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
const pokemonImg =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

const pokemonInfo = 'https://pokeapi.co/api/v2/pokemon-form/1/';
// .types -> me devuelve el tipo del pokemon

const typesColor = {
  bug: '#a8b820',
  dark: '#705848',
  dragon: '#7038f8',
  electric: '#f8d030',
  fairy: '#f8a0e0',
  fighting: '#903028',
  fire: '#f05030',
  flying: '#a890f0',
  ghost: '#705898',
  grass: '#78c850',
  ground: '#e0c068',
  ice: '#98d8d8',
  normal: '#a8a878',
  poison: '#a040a0',
  psychic: '#f85888',
  rock: '#b8a038',
  shadow: '#403246',
  steel: '#b8b8d0',
  unknown: '#68a090',
  water: '#6890f0',
};

const typesImgs = 'https://veekun.com/dex/media/types/en/bug.png';
//imagenes de los tipos
let actualPokemon = '';
let container = document.getElementsByClassName('pokemon')[0];
const defaultContainer = `
<h2>Toca un pokemon!</h2>
<p>Al tocar un pokemon, aqui aparecera toda su informacion</p>
`;

async function getPokemons() {
  let data = await fetch(pokemonsUrl);
  data = await data.json();
  return data.results;
}

async function getPokemon(url) {
  let data = await fetch(url);
  data = await data.json();
  return data;
}

async function setPokemon(data) {
  let name = data.species.name;
  let sprites = [data.sprites.back_default, data.sprites.front_default];
  let types = [];
  let weight = data.weight;
  let height = data.height;
  let stats = data.stats;
  let statsHTML = '';
  let abilities = data.abilities;
  let moves = data.moves;
  for (const type of data.types) {
    types.push(type.type.name);
  }
  let typesUrl = '';
  for (const type of types) {
    let typeUrl = `https://veekun.com/dex/media/types/en/${type}.png`;
    typesUrl += `<img class="typeImg" src="${typeUrl}">`;
  }
  for (const stat of stats) {
    statsHTML += `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
  }
  let bgColor = types[0];
  bgColor = typesColor[bgColor];
  document.body.style.backgroundColor = bgColor;
  let pokemonContainer = `
  <div id="pokemonContainer">
    <h2>${name}</h2>
    <div class="pokemonSprites">
      <img class="spriteImg" src="${sprites[1]}">
      <img class="spriteImg" src="${sprites[0]}">
    </div>
    <div class="pokemonTypes">
    ${typesUrl}
    </div>
    <div class="pokemonData">
      <div class="pokemonWH">
        <p>Weight: <b> ${weight}</b></p>
        <p>Height: <b>${height}</b></p>
      </div>
      <h3>Base Stats</h3>
      <p>${statsHTML} </p>
    </div>
  </div>
  `;
  container.innerHTML = pokemonContainer;
}

function clearPokemonInfo() {
  container.innerHTML = defaultContainer;
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
  setOnClicks();
}

function setOnClicks() {
  let pokemonsCards = document.getElementsByClassName('pokemon-card');
  for (const pokemonCard of pokemonsCards) {
    let pokemon = pokemonCard.id;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    pokemonCard.addEventListener('click', async () => {
      if (actualPokemon != pokemon) {
        actualPokemon = pokemon;
        setPokemon(await getPokemon(url));

        if (window.innerWidth < 601) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
    });
  }
}
clearPokemonInfo();
makePokedex();

let button = document.getElementById('boton');

button.addEventListener('click', () => {
  topFunction();
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0;
}
