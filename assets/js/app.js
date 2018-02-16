
const form = document.getElementById('search-form');
let searchPokemon;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // responseContainer.innerHTML = '';
  searchPokemon = $('#search-keyword').val().replace(/ /g, '+');
  getPokemon();
})

function getPokemon() {
  const pokemonRequest = new XMLHttpRequest();
  pokemonRequest.open('GET', `https://api.pokemontcg.io/v1/cards?name=${searchPokemon}`);
  pokemonRequest.onload = addPokemonCard;
  pokemonRequest.onerror = handleError;
  pokemonRequest.send();
}

function handleError() {
  console.log('Oh, Oh, tenemos un problema');
}

function addPokemonCard() {
  $('#response-container').empty();
  const data = JSON.parse(this.responseText);
  console.log(data);

  for (let i=0; i < data.cards.length; i++) {
    let pokemonPicture = data.cards[i].imageUrl;
    //console.log(pokemonPicture);
    $('#response-container').append(
      "<div class='col-lg-2'><img src='" + pokemonPicture + "' id='choosePokemon' data-toggle='modal' data-target='#exampleModal' /> </div>"
    )
  }
};

//Modal 


const pokemon = document.getElementById('choosePokemon');
function openPokemonInfo() {
  
}