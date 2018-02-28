
const form = document.getElementById('search-form');
let searchPokemon;

fetch('https://api.pokemontcg.io/v1/cards?supertype=pokemon&types=dragon|fire')
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
  for (let i=0; i < data.cards.length; i++) {
    let pokemonPicture = data.cards[i].imageUrl;
    let pokemonId = data.cards[i].id;
    //console.log(pokemonPicture);
    $('#response-container').append(
      "<div class='col-lg-2'><button value='" + pokemonId + "' class='pokemonInfo' type='button' data-toggle='modal' data-target='#myModal'><img class='pokemon' src='" + pokemonPicture + "' /></button></div>"
    )}

    $('.pokemonInfo').click(function() {
      $('.modal-title').empty(); 
      $('.modal-body').empty(); 
      const pokeId = $(this).val();
      fetch(`https://api.pokemontcg.io/v1/cards/${pokeId}`)
      .then((response) => {
        return response.json();
      })
      .then((pokedata) => {
        //console.log(pokedata);
        let poke = pokedata.card;
        $('.modal-title').append('<h3>' + poke.name + '</h3>')
        $('.modal-body').append('<img src="' + poke.imageUrl +'" /><p><strong>Types:</strong> ' + poke.types[0] + '</p><p><strong>Subtype:</strong> ' + poke.subtype + '</p><p><strong>Series:</strong> ' + poke.series + '</p><p><strong>Set:</strong> ' + poke.set + '</p>');
        })
      .catch((err) => {
          alert(err);
      });
      })
})
.catch((err) => {
  alert(err);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // responseContainer.innerHTML = '';
  searchPokemon = $('#search-keyword').val().replace(/ /g, '+');
  getPokemon();
})

function getPokemon() {
fetch(`https://api.pokemontcg.io/v1/cards?name=${searchPokemon}`)
.then((response) => {
  return response.json();
})
.then((data) => {
  $('#response-container').empty();
  //console.log(data);

  for (let i=0; i < data.cards.length; i++) {
    let pokemonPicture = data.cards[i].imageUrl;
    let pokemonId = data.cards[i].id;
    //console.log(pokemonPicture);
    $('#response-container').append(
      "<div class='col-lg-2'><button value='" + pokemonId + "' class='pokemonInfo' type='button' data-toggle='modal' data-target='#myModal'><img class='pokemon' src='" + pokemonPicture + "' /></button></div>"
    )}

    $('.pokemonInfo').click(function() {
      $('.modal-body').empty(); 
      const pokeId = $(this).val();
      fetch(`https://api.pokemontcg.io/v1/cards/${pokeId}`)
      .then((response) => {
        return response.json();
      })
      .then((pokedata) => {
        //console.log(pokedata);
        let poke = pokedata.card;
        $('.modal-title').append('<h3>' + poke.name + '</h3>')
        $('.modal-body').append('<img src="' + poke.imageUrl +'" /><p><strong>Types:</strong> ' + poke.types[0] + '</p><p><strong>Subtype:</strong> ' + poke.subtype + '</p><p><strong>Series:</strong> ' + poke.series + '</p><p><strong>Set:</strong> ' + poke.set + '</p>');
        })
      .catch((err) => {
          alert(err);
      });
      })
})
.catch((err) => {
  alert(err);
});
}
