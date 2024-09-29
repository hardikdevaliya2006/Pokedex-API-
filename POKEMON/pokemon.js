const MAX_POKEMON = 100;
let APIdata = document.getElementById("api");
let searchInput;

const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");

displayAllPokemons();

const typeColors = {
  normal: "#A8A878da",
  fire: "#F08030da",
  water: "#6890F0da",
  electric: "#F8D030da",
  grass: "#78C850da",
  ice: "#98D8D8da",
  fighting: "#C03028da",
  poison: "#A040A0da",
  ground: "#E0C068da",
  flying: "#A890F0da",
  psychic: "#F85888da",
  bug: "#A8B820da",
  rock: "#B8A038da",
  ghost: "#705898da",
  dragon: "#7038F8da",
  dark: "#705848da",
  steel: "#B8B8D0da",
};

async function getData() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
  let poke = await response.json();
  return poke.results;
}

async function getPokemonDetails(pokemonID) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  let result = await response.json();
  return result;
}

async function displayAllPokemons() {
  let cullter = "";
  let APIdata = document.getElementById("api");
  let pokeData = await getData();

  for (let poke of pokeData) {
    let pokeMoneID = poke.url.split("/")[6];
    const pokemonDetails = await getPokemonDetails(pokeMoneID);
    const mainType = pokemonDetails.types[0].type.name;
    const color = typeColors[mainType] || "#FFFFFF";

    const pokeImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

    cullter += `
      <div class="poke-warrap" style="background-color: ${color}">
        <div class="poke-id">
          <p>#${pokeMoneID}.</p>
        </div>
        <div class="poke-img">
          <img src="${pokeImg}${pokeMoneID}.png" id=${pokeMoneID} alt="${poke.name}">
        </div>
        <div class="poke-name">
          <p>${poke.name}</p>
        </div>
      </div>`;
  }
  APIdata.innerHTML = cullter;
}

async function displayAllPokemonsBySearch(pokeSearch) {
  let cullter = "";

  for (let poke of pokeSearch) {
    let pokeMoneID = poke.url.split("/")[6];
    const pokemonDetails = await getPokemonDetails(pokeMoneID);
    const mainType = pokemonDetails.types[0].type.name;
    const color = typeColors[mainType] || "#FFFFFF";

    const pokeImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

    cullter += `
      <div class="poke-warrap" id="color" style="background-color: ${color}">
        <div class="poke-id">
          <p>#${pokeMoneID}.</p>
        </div>
        <div class="poke-img">
          <img src="${pokeImg}${pokeMoneID}.png" alt="${poke.name}">
        </div>
        <div class="poke-name">
          <p>${poke.name}</p>
        </div>
      </div>`;
  }

  APIdata.innerHTML = cullter;
}

async function handleSearch(searchValue) {
  searchInput = searchValue.value;
  let filteredPokemons;
  const allPokemons = await getData();

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((poke) => {
      const pokemonID = poke.url.split("/")[6];
      return pokemonID.startsWith(searchInput);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((poke) => {
      return poke.name.toLowerCase().startsWith(searchInput);
    });
  } else {
    filteredPokemons = allPokemons;
  }
  
  displayAllPokemonsBySearch(filteredPokemons);

  let errorEle = document.getElementById("error");
  if (filteredPokemons.length === 0) {
    errorEle.style.display = "block";
  } else {
    errorEle.style.display = "none";
  }
}