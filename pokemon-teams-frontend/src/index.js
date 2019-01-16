const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let TRAINERDATA = "";

document.addEventListener("DOMContentLoaded", function(){
  populateTrainers();
});


const fetchTrainers = () => {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => json);
};

let populateTrainers = () => {
  let fetchTrainerData = fetchTrainers();
  fetchTrainerData.then(function(trainerData){
    TRAINERDATA = trainerData;
    trainerData.forEach(function(tData){
      trainerCard(tData);
    });
  });
};

let trainerCard = (trainerData) => {
  let trainerContainer = getMainBody();

  let div = document.createElement('div');
  div.classList = "card";
  div.setAttribute("data-id", trainerData.id)
  trainerContainer.appendChild(div);

  let p = document.createElement('p');
  p.innerText = trainerData.name;
  div.appendChild(p);

  let button = document.createElement('button');
  button.innerText = "Add Pokemon";
  button.setAttribute("data-trainer-id", trainerData.id);
  div.appendChild(button);
  button.addEventListener("click", function(event){
    addPokemon(event.target.getAttribute("data-trainer-id"));
  });

  let ul = document.createElement('ul');
  ul.id = trainerData.id;
  div.appendChild(ul);

  trainerData.pokemons.forEach(function(pokeData){
    //FIX ME
    //debugger;
    addPokemonRow(pokeData, pokeData.trainer_id);
    // let ul = getMainBody().querySelectorAll('ul');
    // ul = ul[ul.length - 1];
    //
    // let li = document.createElement('li');
    // li.innerText = `${pokeData.nickname} (${pokeData.species})`;
    // li.id = (`li-pokemon-id-${pokeData.id}`);
    // ul.appendChild(li);
    //
    // let button = document.createElement('button');
    // button.classList = "release";
    // button.setAttribute("data-pokemon-id", pokeData.id);
    // button.id = pokeData.id;
    // button.innerText = "Release";
    // li.appendChild(button);
    // button.addEventListener("click", function(event){
    //   deletePokemon(event.target.id);
    // })
  });
};
let addPokemonRow = (pokeData, userId) => {
  let ul = getMainBody().querySelectorAll('ul');
  ul = ul[userId - 1];

  let li = document.createElement('li');
  li.innerText = `${pokeData.nickname} (${pokeData.species})`;
  li.id = (`li-pokemon-id-${pokeData.id}`);
  ul.appendChild(li);

  let button = document.createElement('button');
  button.classList = "release";
  button.setAttribute("data-pokemon-id", pokeData.id);
  button.id = pokeData.id;
  button.innerText = "Release";
  li.appendChild(button);
  button.addEventListener("click", function(event){
    deletePokemon(event.target.id);
  })
};

let deletePokemon = (pokemonId) => {
  return fetch(`${POKEMONS_URL}/${pokemonId}`,
    {
      method: "DELETE",
      headers:
        {
          "content-type":"application/json"
        },
        body: JSON.stringify({id: pokemonId})
    })
    .then(res => res.json())
    .then(res => {
      document.querySelector(`#li-pokemon-id-${pokemonId}`).remove();
    });
};

let checkNumberOfPokemon = (userId) => {
  let trainerData = TRAINERDATA[userId-1];
  return trainerData.pokemons.length;
};

let fetchPokemon = (userId) => {
  return fetch(POKEMONS_URL,
    {
      method: "POST",
      headers:
        {
          "content-type":"application/json",
          accept: "application/json"
        },
      body: JSON.stringify({trainer_id: userId})
    })
};

let addPokemon = (userId) => {
  //debugger;
fetchPokemon(userId)
.then(res=>res.json())
.then(newPokeData => {
  if (newPokeData.error){
      alert(newPokeData.error);
  } else {
    addPokemonRow(newPokeData, userId);
  };
});
};


const getMainBody = () => {return document.querySelector('main')};

const getPokemonListElement = (id) => {return document.querySelector()};
